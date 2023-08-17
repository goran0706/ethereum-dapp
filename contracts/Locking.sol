// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./TokenRegistry.sol";
import "./ContractRegistry.sol";
import "./libs/PercentageCalculator.sol";

/**
 * @title Locking Contract
 * @dev Allows users to lock tokens for a specified period and later unlock them, subject to an exit fee.
 */
contract Locking is Ownable, ReentrancyGuard, TokenRegistry {
    using PercentageCalculator for uint256;

    ContractRegistry public cRegistry;

    struct Lock {
        address beneficiary;
        uint256 amount;
        uint256 unlockTime;
        bool unlocked;
    }

    event TokensLocked(
        address indexed beneficiary,
        uint256 amount,
        uint256 unlockTime,
        bool unlocked
    );

    event TokensUnlocked(
        address indexed beneficiary,
        uint256 amount,
        uint256 fee
    );

    uint256 public minUnlockTime = 0;
    uint256 public exitFeePercentage = 0;

    mapping(address => Lock[]) public lockedBalances;

    /**
     * @dev Contract constructor
     * @param _minUnlockTime Minimum time required to elapse before tokens can be unlocked
     * @param _exitFeePercentage Percentage of exit fee to be charged on unlocked tokens
     * @param _tokens List of supported token addresses
     */
    constructor(
        address[] memory _tokens,
        uint256 _minUnlockTime,
        uint256 _exitFeePercentage
    ) {
        importTokens(_tokens);
        minUnlockTime = _minUnlockTime;
        exitFeePercentage = _exitFeePercentage;
    }

    /**
     * @dev Lock tokens for a specified beneficiary with a given unlock time.
     * @param _token Address of the token to be locked
     * @param _beneficiary Address of the beneficiary
     * @param _amount Amount of tokens to be locked
     * @param _unlockTime Time when the tokens can be unlocked
     */
    function lockTokens(
        address _token,
        address _beneficiary,
        uint256 _amount,
        uint256 _unlockTime
    ) external {
        require(_beneficiary != address(0), "Zero beneficiary address");
        require(isSupported(_token), "Unsupported token");
        require(_amount > 0, "Invalid amount");
        require(
            _unlockTime > block.timestamp + minUnlockTime,
            "Invalid unlock time"
        );

        Lock memory newLock = Lock(_beneficiary, _amount, _unlockTime, false);
        lockedBalances[_beneficiary].push(newLock);

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        emit TokensLocked(_beneficiary, _amount, _unlockTime, newLock.unlocked);
    }

    /**
     * @dev Unlock tokens based on the lock index, subject to exit fees.
     * @param _token Address of the token to be unlocked
     * @param _beneficiary Address of the beneficiary
     * @param _lockIndex Index of the locked balance to be unlocked
     */
    function unlockTokens(
        address _token,
        address _beneficiary,
        uint256 _lockIndex
    ) external nonReentrant {
        require(isSupported(_token), "Unsupported token");
        require(
            _beneficiary == msg.sender || msg.sender == owner(),
            "Not authorized"
        );
        require(
            _lockIndex < lockedBalances[_beneficiary].length,
            "Invalid lock index"
        );

        Lock storage lock = lockedBalances[_beneficiary][_lockIndex];
        require(!lock.unlocked, "Already unlocked");
        require(lock.unlockTime >= block.timestamp, "Still locked");

        lock.unlocked = true;

        address treasuryAddress = cRegistry.requireAndGetAddress("Treasury");
        uint256 amount = lock.amount - calcFee(lock.amount, exitFeePercentage);
        uint256 feeAmount = lock.amount - amount;

        IERC20 token = IERC20(_token);
        token.transfer(_beneficiary, amount);
        token.transfer(treasuryAddress, feeAmount);

        emit TokensUnlocked(_beneficiary, amount, feeAmount);
    }

    /**
     * @dev Set the withdrawal fee percentage for unlocking tokens.
     * @param _withdrawalFee New withdrawal fee percentage to be set
     */
    function setWithdrawalFee(uint256 _withdrawalFee) external onlyOwner {
        require(
            _withdrawalFee <= 100,
            "Invalid percentage, must be between 0 and 100"
        );
        exitFeePercentage = _withdrawalFee;
    }

    /**
     * @dev Set the minimum unlock time for locked tokens.
     * @param _minUnlockTime New minimum unlock time to be set
     */
    function setMinUnlockTime(uint256 _minUnlockTime) external onlyOwner {
        minUnlockTime = _minUnlockTime;
    }

    /**
     * @dev Get the count of locked balances for a given beneficiary.
     * @param _beneficiary Address of the beneficiary
     * @return Count of locked balances
     */
    function getLocksCount(
        address _beneficiary
    ) external view returns (uint256) {
        return lockedBalances[_beneficiary].length;
    }

    /**
     * @dev Get the details of a specific locked balance.
     * @param _beneficiary Address of the beneficiary
     * @param _lockIndex Index of the locked balance
     * @return Lock details: beneficiary, amount, unlock time, and unlock status
     */
    function getLockDetails(
        address _beneficiary,
        uint256 _lockIndex
    ) external view returns (Lock memory) {
        require(
            _lockIndex < lockedBalances[_beneficiary].length,
            "Invalid lock index"
        );

        Lock storage lock = lockedBalances[_beneficiary][_lockIndex];
        return (lock);
    }

    /**
     * @dev Calculate the exit fee based on the locked amount and exit fee percentage.
     * @param amount Locked amount to calculate the fee for
     * @param percentage Exit fee percentage
     * @return Exit fee amount
     */
    function calcFee(
        uint256 amount,
        uint256 percentage
    ) internal pure returns (uint256) {
        return amount.calculatePercentage(percentage);
    }
}
