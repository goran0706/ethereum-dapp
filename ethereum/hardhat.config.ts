import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const { ALCHEMY_API_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  // defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 1337,
      // forking: {
      //   url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      // },
    },
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [ACCOUNT_PRIVATE_KEY],
    // },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
