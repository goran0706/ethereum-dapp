// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

import "./TokenRegistry.sol";
import "./ContractRegistry.sol";
import "./libs/PercentageCalculator.sol";

/**
 * @title Staking Contract
 * @dev Allows users to stake tokens and earn rewards
 */
contract Staking is Ownable, ReentrancyGuard, TokenRegistry {
    using PercentageCalculator for uint256;

    IUniswapV2Factory public factory;
    IUniswapV2Router02 public router;
    ContractRegistry public cRegistry;

    uint256 public exitFeePercentage = 1 * 1e18;
    mapping(address => uint256) public rewardsEarned;
    mapping(address => mapping(address => uint256)) public stakedBalances;
    mapping(address => mapping(address => uint256)) public lastStakeTimestamp;
    mapping(address => uint256) public totalStaked;
    mapping(address => uint256) public totalStakers;
    mapping(address => uint256) public totalRewardsDistributed;

    event Staked(address indexed user, address token, uint256 amount);
    event Unstaked(address indexed user, address token, uint256 amount);
    event RewardsDistributed(address indexed token, uint256 amount);
    event LiquidityAdded(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );
    event LiquidityRemoved(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    constructor(address[] memory _tokens, address _factory, address _router) {
        registerTokens(_tokens);
        factory = IUniswapV2Factory(_factory);
        router = IUniswapV2Router02(_router);
    }

    modifier validToken(address token) {
        require(isSupported(token), "Invalid token");
        _;
    }

    modifier validAmount(uint256 amount) {
        require(amount > 0, "Invalid amount");
        _;
    }

    modifier hasSufficientBalance(
        address user,
        address token,
        uint256 amount
    ) {
        require(stakedBalances[user][token] >= amount, "Insufficient balance");
        _;
    }

    function _transferTokens(
        address _token,
        address _recipient,
        uint256 _amount
    ) internal {
        IERC20(_token).transfer(_recipient, _amount);
    }

    function _transferTokensFrom(address _token, uint256 _amount) internal {
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    }

    function _verifyPermitAndTransfer(
        address token,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal {
        IERC20Permit(token).permit(
            msg.sender,
            address(this),
            amount,
            deadline,
            v,
            r,
            s
        );
        _transferTokensFrom(token, amount);
    }

    function _updateRewardsData(address user, address token) internal {
        rewardsEarned[user] = calculateRewards(user, token);
        lastStakeTimestamp[user][token] = block.timestamp;
        totalRewardsDistributed[token] += rewardsEarned[user];
    }

    function _increaseStake(
        address user,
        address token,
        uint256 amount
    ) internal {
        stakedBalances[user][token] += amount;
        totalStaked[token] += amount;
        totalStakers[token] += 1;
    }

    function _decreaseStake(
        address user,
        address token,
        uint256 amount
    ) internal {
        stakedBalances[user][token] -= amount;
        totalStaked[token] -= amount;
    }

    function setExitFee(uint256 _exitFee) external onlyOwner {
        require(_exitFee <= 100 * 1e18, "Invalid fee percentage");
        exitFeePercentage = _exitFee;
    }

    function calculateExitFee(
        uint256 amount
    ) internal view returns (uint256 unlockedAmount, uint256 exitFee) {
        exitFee = amount.calculatePercentage(exitFeePercentage);
        unlockedAmount = amount - exitFee;
    }

    function calculateRewards(
        address user,
        address token
    ) internal view returns (uint256) {
        uint256 stakedBalance = stakedBalances[user][token];
        uint256 timeStaked = block.timestamp - lastStakeTimestamp[user][token];
        uint256 weightedFactor = 100;
        return (stakedBalance * timeStaked * weightedFactor) / 100;
    }

    function _addLiquidityAndStake(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        address lpToken
    ) internal nonReentrant {
        require(amountIn > 0 && amountOut > 0, "Invalid amounts");
        _transferTokensFrom(tokenIn, amountIn);
        _transferTokensFrom(tokenOut, amountOut);
        (, , uint256 liquidity) = router.addLiquidity(
            tokenIn,
            tokenOut,
            amountIn,
            amountOut,
            0,
            0,
            address(this),
            block.timestamp
        );
        _updateRewardsData(msg.sender, lpToken);
        _increaseStake(msg.sender, lpToken, liquidity);
        emit LiquidityAdded(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
        emit Staked(msg.sender, lpToken, liquidity);
    }

    /**
     * @dev Allows users to stake tokens using a permit signature
     * @param token Address of the token to be staked
     * @param amount Amount of tokens to be staked
     * @param deadline Deadline timestamp for the permit
     * @param v Signature recovery id
     * @param r Signature R value
     * @param s Signature S value
     */
    function stakeWithPermit(
        address token,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external validToken(token) validAmount(amount) nonReentrant {
        _verifyPermitAndTransfer(token, amount, deadline, v, r, s);
        _updateRewardsData(msg.sender, token);
        _increaseStake(msg.sender, token, amount);
        emit Staked(msg.sender, token, amount);
    }

    /**
     * @dev Allows users to stake tokens and earn rewards
     * @param token Address of the token to be staked
     * @param amount Amount of tokens to be staked
     */
    function stake(
        address token,
        uint256 amount
    ) external validToken(token) validAmount(amount) nonReentrant {
        _transferTokensFrom(token, amount);
        _updateRewardsData(msg.sender, token);
        _increaseStake(msg.sender, token, amount);
        emit Staked(msg.sender, token, amount);
    }

    /**
     * @dev Allows users to unstake tokens and claim rewards
     * @param token Address of the token to be unstaked
     * @param amount Amount of tokens to be unstaked
     */
    function unstake(
        address token,
        uint256 amount
    )
        external
        validToken(token)
        hasSufficientBalance(msg.sender, token, amount)
        nonReentrant
    {
        _updateRewardsData(msg.sender, token);
        _decreaseStake(msg.sender, token, amount);

        (uint256 unlockedAmount, uint256 feeAmount) = calculateExitFee(amount);

        _transferTokens(token, msg.sender, unlockedAmount);
        _transferTokens(
            token,
            cRegistry.requireAndGetAddress("Treasury"),
            feeAmount
        );

        emit Unstaked(msg.sender, token, amount);
    }

    /**
     * @dev Allows users to add liquidity to a pair and stake LP tokens using a permit signature
     * @param tokenIn Address of the first token in the pair
     * @param tokenOut Address of the second token in the pair
     * @param amountIn Amount of the first token to be added as liquidity
     * @param amountOut Amount of the second token to be added as liquidity
     * @param deadline Deadline timestamp for the permit
     * @param v Signature recovery id
     * @param r Signature R value
     * @param s Signature S value
     */
    function addLiquidityAndStakeWithPermit(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external nonReentrant {
        require(isSupported(tokenIn) && isSupported(tokenOut), "Invalid token");
        _verifyPermitAndTransfer(tokenOut, amountOut, deadline, v, r, s);
        _addLiquidityAndStake(
            tokenIn,
            tokenOut,
            amountIn,
            amountOut,
            factory.getPair(tokenIn, tokenOut)
        );
    }

    /**
     * @dev Allows users to add liquidity to a pair and stake LP tokens
     * @param tokenIn Address of the first token in the pair
     * @param tokenOut Address of the second token in the pair
     * @param amountIn Amount of the first token to be added as liquidity
     * @param amountOut Amount of the second token to be added as liquidity
     */
    function addLiquidityAndStake(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut
    ) external nonReentrant {
        require(isSupported(tokenIn) && isSupported(tokenOut), "Invalid token");
        _addLiquidityAndStake(
            tokenIn,
            tokenOut,
            amountIn,
            amountOut,
            factory.getPair(tokenIn, tokenOut)
        );
    }

    /**
     * @dev Allows users to remove liquidity from a pair and unstake LP tokens
     * @param lpToken Address of the LP token pair
     * @param liquidity Amount of LP tokens to be removed
     * @param minAmountA Minimum amount of the first token to receive
     * @param minAmountB Minimum amount of the second token to receive
     */
    function removeLiquidityAndUnstake(
        address lpToken,
        uint256 liquidity,
        uint256 minAmountA,
        uint256 minAmountB
    )
        external
        validAmount(liquidity)
        hasSufficientBalance(msg.sender, lpToken, liquidity)
        nonReentrant
    {
        IUniswapV2Pair pair = IUniswapV2Pair(lpToken);

        (uint256 amount0, uint256 amount1) = router.removeLiquidity(
            pair.token0(),
            pair.token1(),
            liquidity,
            minAmountA,
            minAmountB,
            address(this),
            block.timestamp
        );

        _updateRewardsData(msg.sender, lpToken);
        _decreaseStake(msg.sender, lpToken, liquidity);

        (uint256 unlockedAmount, uint256 feeAmount) = calculateExitFee(
            amount0 + amount1
        );

        _transferTokens(pair.token0(), msg.sender, unlockedAmount);
        _transferTokens(
            pair.token0(),
            cRegistry.requireAndGetAddress("Treasury"),
            feeAmount
        );

        emit LiquidityRemoved(
            msg.sender,
            pair.token0(),
            pair.token1(),
            amount0,
            amount1
        );
        emit Unstaked(msg.sender, lpToken, liquidity);
    }
}
