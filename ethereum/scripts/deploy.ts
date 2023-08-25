import hre from "hardhat";
import {
  EXIT_FEE,
  FACTORY_ADDRESS,
  LMX,
  LOCKING,
  PRE_MINT,
  ROUTER_ADDRESS,
  STAKING,
} from "./constants";

export async function deployContracts() {
  // ERC20 LuminaX Contract
  const token = await hre.ethers.deployContract("LuminaX", [PRE_MINT]);
  await token.waitForDeployment();
  console.log(`Token deployed to ${token.target}`);

  // Locking Contract
  const locking = await hre.ethers.deployContract("Locking", [[token.target]]);
  await locking.waitForDeployment();
  await locking.setExitFee(EXIT_FEE);
  console.log(`Locking deployed to ${locking.target}`);

  // Staking Contract
  const staking = await hre.ethers.deployContract("Staking", [
    [token.target],
    FACTORY_ADDRESS,
    ROUTER_ADDRESS,
  ]);
  await staking.waitForDeployment();
  await staking.setExitFee(EXIT_FEE);
  console.log(`Staking deployed to ${staking.target}`);

  // Contract Registry Contract
  const cRegistry = await hre.ethers.deployContract("ContractRegistry");
  await cRegistry.waitForDeployment();
  console.log(`ContractRegistry deployed to ${cRegistry.target}`);

  // Register the deployed smart contracts
  const names = [LMX, LOCKING, STAKING];
  const addresses = [token.target, locking.target, staking.target];
  await cRegistry.registerContracts(names, addresses);
}
