// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
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

    enum LockingPeriod {
        OneMonth,
        ThreeMonths,
        SixMonths,
        OneYear,
        TwoYears,
        FourYears
    }

    struct Lock {
        uint256 amount;
        uint256 unlockTime;
        bool unlocked;
    }

    event TokensLocked(
        address indexed beneficiary,
        uint256 amount,
        uint256 unlockTime
    );

    event TokensUnlocked(
        address indexed beneficiary,
        uint256 amount,
        uint256 fee
    );

    uint256 public exitFeePercentage = 1 * 1e18;
    mapping(address => Lock) public lockedBalances;
    mapping(LockingPeriod => uint256) public lockingPeriods;

    constructor(address[] memory _tokens) {
        registerTokens(_tokens);
        initializeLockingPeriods();
    }

    modifier validToken(address token) {
        require(isSupported(token), "Unsupported token");
        _;
    }

    modifier validAmount(uint256 amount) {
        require(amount > 0, "Invalid amount");
        _;
    }

    modifier hasPositiveAmount(uint256 amount) {
        require(amount > 0, "Amount must be positive");
        _;
    }

    modifier notZeroAddress(address addr) {
        require(addr != address(0), "Zero address");
        _;
    }

    modifier onlyBeneficiary(address beneficiary) {
        require(msg.sender == beneficiary, "Not beneficiary");
        _;
    }

    modifier notUnlocked(Lock storage lock) {
        require(!lock.unlocked, "Already unlocked");
        _;
    }

    modifier unlocked(Lock storage lock) {
        require(lock.unlocked, "Not unlocked");
        _;
    }

    modifier lockExists(Lock storage lock) {
        require(lock.amount > 0, "No locked amount");
        _;
    }

    modifier lockingPeriodPassed(Lock storage lock) {
        require(block.timestamp >= lock.unlockTime, "Still locked");
        _;
    }

    function initializeLockingPeriods() internal {
        lockingPeriods[LockingPeriod.OneMonth] = 30 days;
        lockingPeriods[LockingPeriod.ThreeMonths] = 90 days;
        lockingPeriods[LockingPeriod.SixMonths] = 180 days;
        lockingPeriods[LockingPeriod.OneYear] = 365 days;
        lockingPeriods[LockingPeriod.TwoYears] = 730 days;
        lockingPeriods[LockingPeriod.FourYears] = 1460 days;
    }

    function lockTokensWithPermit(
        address _token,
        address _beneficiary,
        uint256 _amount,
        LockingPeriod _lockingPeriod,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    )
        external
        validToken(_token)
        notZeroAddress(_beneficiary)
        validAmount(_amount)
        nonReentrant
    {
        IERC20Permit(_token).permit(
            msg.sender,
            address(this),
            _amount,
            _deadline,
            _v,
            _r,
            _s
        );
        _lockTokens(_token, _beneficiary, _amount, _lockingPeriod);
    }

    function lockTokens(
        address _token,
        address _beneficiary,
        uint256 _amount,
        LockingPeriod _lockingPeriod
    )
        external
        validToken(_token)
        notZeroAddress(_beneficiary)
        validAmount(_amount)
        nonReentrant
    {
        _lockTokens(_token, _beneficiary, _amount, _lockingPeriod);
    }

    function unlockTokens(address _token) external nonReentrant {
        Lock storage lock = lockedBalances[msg.sender];
        _validateUnlock(lock);
        lock.unlocked = true;

        (uint256 amount, uint256 feeAmount) = calculateExitFee(lock.amount);
        _transferTokens(_token, msg.sender, amount);
        _transferTokens(
            _token,
            cRegistry.requireAndGetAddress("Treasury"),
            feeAmount
        );

        emit TokensUnlocked(msg.sender, amount, feeAmount);

        delete lockedBalances[msg.sender];
    }

    function setExitFee(uint256 _exitFee) external onlyOwner {
        require(_exitFee <= 100 * 1e18, "Invalid fee percentage");
        exitFeePercentage = _exitFee;
    }

    function getLockDetails(
        address _beneficiary
    ) external view returns (Lock memory) {
        return lockedBalances[_beneficiary];
    }

    function getLockingPeriodDuration(
        LockingPeriod period
    ) external view returns (uint256) {
        return lockingPeriods[period];
    }

    function _lockTokens(
        address _token,
        address _beneficiary,
        uint256 _amount,
        LockingPeriod _lockingPeriod
    ) internal {
        uint256 unlockTime = block.timestamp + lockingPeriods[_lockingPeriod];
        Lock storage lock = lockedBalances[_beneficiary];
        if (lock.unlockTime == 0 || unlockTime > lock.unlockTime) {
            lock.unlockTime = unlockTime;
        }
        lock.amount += _amount;

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        emit TokensLocked(_beneficiary, _amount, unlockTime);
    }

    function _validateUnlock(Lock storage _lock) internal view {
        require(_lock.amount > 0, "No locked amount");
        require(!_lock.unlocked, "Already unlocked");
        require(_lock.unlockTime <= block.timestamp, "Still locked");
    }

    function calculateExitFee(
        uint256 amount
    ) internal view returns (uint256 unlockedAmount, uint256 exitFee) {
        exitFee = amount.calculatePercentage(exitFeePercentage);
        unlockedAmount = amount - exitFee;
    }

    function _transferTokens(
        address _token,
        address _recipient,
        uint256 _amount
    ) internal {
        IERC20(_token).transfer(_recipient, _amount);
    }
}
