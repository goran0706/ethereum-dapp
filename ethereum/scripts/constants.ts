import hre from "hardhat";

// Initial State Variables
export const currentTimestamp = Math.floor(Date.now() / 1000);
export const lockTimeInSeconds = 30 * 24 * 60 * 60;
export const UNLOCK_TIMESTAMP = currentTimestamp + lockTimeInSeconds;
export const PRE_MINT = 100_000_000; // Token supply * 18 decimals
export const EXIT_FEE = hre.ethers.parseEther("1"); // 1%

// Uniswap Contracts
export const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984"; // Uniswap Factory address
export const ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45"; // Uniswap Router address

// Encoded names
export const LMX = hre.ethers.encodeBytes32String("LMX");
export const LOCKING = hre.ethers.encodeBytes32String("Locking");
export const STAKING = hre.ethers.encodeBytes32String("Staking");
