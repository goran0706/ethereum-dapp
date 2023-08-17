// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat')

async function main() {
  // Token supply
  const PRE_MINT = 100_000_000
  // Calculate the unlock timestamp
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const lockTimeInSeconds = 30 * 24 * 60 * 60
  const unlockTimestamp = currentTimestamp + lockTimeInSeconds
  // ExitFeePercentage
  const exitFee = 1
  // The list of tokens supported
  const tokens = []
  // Uniswap Factory address
  const factory = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
  // Uniswap Router address
  const router = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

  // Deployments
  const cRegistry = await hre.ethers.deployContract('ContractRegistry')
  await cRegistry.waitForDeployment()
  console.log(`ContractRegistry deployed to ${cRegistry.target}`)

  const tRegistry = await hre.ethers.deployContract('TokenRegistry')
  await tRegistry.waitForDeployment()
  console.log(`TokenRegistry deployed to ${tRegistry.target}`)

  const token = await hre.ethers.deployContract('Token', [PRE_MINT])
  await token.waitForDeployment()
  console.log(`Token deployed to ${token.target}`)

  const locking = await hre.ethers.deployContract('Locking', [tokens, unlockTimestamp, exitFee])
  await locking.waitForDeployment()
  console.log(`Locking deployed to ${locking.target}`)

  const staking = await hre.ethers.deployContract('Staking', [tokens, factory, router])
  await staking.waitForDeployment()
  console.log(`Staking deployed to ${staking.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
