// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';

import './TokenRegistry.sol';

/**
 * @title Staking Contract with APR Calculation
 * @dev Allows users to stake tokens and earn rewards with APR calculation
 */
contract Staking is Ownable, ReentrancyGuard, TokenRegistry {
  struct TokenAPR {
    uint256 totalStaked;
    uint256 totalRewards;
    uint256 annualAPR;
  }

  IUniswapV2Factory public factory;
  IUniswapV2Router02 public router;

  mapping(address => mapping(address => uint256)) public lastStakeTimestamp;
  mapping(address => mapping(address => uint256)) public stakedBalances;
  mapping(address => uint256) public totalStaked;
  mapping(address => uint256) public totalStakers;
  mapping(address => uint256) public rewardsEarned;
  mapping(address => uint256) public totalRewardsDistributed;
  mapping(address => TokenAPR) public tokenAPR; // Store APR information for each token

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
    importTokens(_tokens);
    factory = IUniswapV2Factory(_factory);
    router = IUniswapV2Router02(_router);
  }

  modifier validToken(address token) {
    require(isSupported(token), 'Invalid token');
    _;
  }

  modifier validStakeAmount(uint256 amount) {
    require(amount > 0, 'Invalid amount');
    _;
  }

  modifier hasSufficientBalance(
    address user,
    address token,
    uint256 amount
  ) {
    require(stakedBalances[user][token] >= amount, 'Insufficient balance');
    _;
  }

  /**
   * @dev Allows users to stake tokens and earn rewards
   * @param token Address of the token to be staked
   * @param amount Amount of tokens to be staked
   */
  function stake(
    address token,
    uint256 amount
  ) external validToken(token) validStakeAmount(amount) nonReentrant {
    IERC20(token).transferFrom(msg.sender, address(this), amount);
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
  ) external validToken(token) hasSufficientBalance(msg.sender, token, amount) nonReentrant {
    _updateRewardsData(msg.sender, token);
    _decreaseStake(msg.sender, token, amount);
    IERC20(token).transfer(msg.sender, amount);
    emit Unstaked(msg.sender, token, amount);
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
  ) external {
    require(amountIn > 0 && amountOut > 0, 'Invalid amounts');
    require(isSupported(tokenIn) && isSupported(tokenOut), 'Invalid token');
    IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
    IERC20(tokenOut).transferFrom(msg.sender, address(this), amountOut);
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
    address lpToken = factory.getPair(tokenIn, tokenOut);
    _updateRewardsData(msg.sender, lpToken);
    _increaseStake(msg.sender, lpToken, liquidity);
    emit LiquidityAdded(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    emit Staked(msg.sender, lpToken, liquidity);
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
  ) external hasSufficientBalance(msg.sender, lpToken, liquidity) nonReentrant {
    require(liquidity > 0, 'Invalid amount');
    IUniswapV2Pair pair = IUniswapV2Pair(lpToken);
    address token0 = pair.token0();
    address token1 = pair.token0();
    (uint256 amount0, uint256 amount1) = router.removeLiquidity(
      token0,
      token1,
      liquidity,
      minAmountA,
      minAmountB,
      address(this),
      block.timestamp
    );
    _updateRewardsData(msg.sender, lpToken);
    _decreaseStake(msg.sender, lpToken, liquidity);
    emit LiquidityRemoved(msg.sender, token0, token1, amount0, amount1);
    emit Unstaked(msg.sender, lpToken, liquidity);
  }

  /**
   * @dev Calculates rewards for a user based on staked amount and time
   * @param user Address of the user
   * @param token Address of the token
   * @return The calculated rewards for the user
   */
  function calculateRewards(address user, address token) internal view returns (uint256) {
    uint256 stakedBalance = stakedBalances[user][token];
    uint256 timeStaked = block.timestamp - lastStakeTimestamp[user][token];
    uint256 weightedFactor = 100;
    return (stakedBalance * timeStaked * weightedFactor) / 100;
  }

  /**
   * @dev Get the annual APR for a specific token
   * @param token Address of the token
   * @return The annual APR for the token
   */
  function getAPR(address token) external view returns (uint256) {
    return tokenAPR[token].annualAPR;
  }

  /**
   * @dev Updates rewards data for a user and token
   * @param user Address of the user
   * @param token Address of the token
   */
  function _updateRewardsData(address user, address token) internal {
    rewardsEarned[user] = calculateRewards(user, token);
    lastStakeTimestamp[user][token] = block.timestamp;
    totalRewardsDistributed[token] += rewardsEarned[user]; // Update total rewards distributed

    // Calculate and update annual APR
    TokenAPR storage aprInfo = tokenAPR[token];
    aprInfo.totalStaked = totalStaked[token];
    aprInfo.totalRewards = totalRewardsDistributed[token];

    if (aprInfo.totalStaked > 0) {
      uint256 annualRewards = rewardsEarned[user] * (365 days); // Calculate annual rewards based on rewardsEarned
      aprInfo.annualAPR = (annualRewards * 100) / aprInfo.totalStaked;
    }
  }

  /**
   * @dev Increases staked balance and total staked for a user and token
   * @param user Address of the user
   * @param token Address of the token
   * @param amount Amount to increase the stake by
   */
  function _increaseStake(address user, address token, uint256 amount) internal {
    stakedBalances[user][token] += amount;
    totalStaked[token] += amount;
    totalStakers[token] += 1; // Increase the total stakers count
  }

  /**
   * @dev Decreases staked balance and total staked for a user and token
   * @param user Address of the user
   * @param token Address of the token
   * @param amount Amount to decrease the stake by
   */
  function _decreaseStake(address user, address token, uint256 amount) internal {
    stakedBalances[user][token] -= amount;
    totalStaked[token] -= amount;
  }
}
