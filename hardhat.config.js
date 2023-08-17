require('@nomicfoundation/hardhat-toolbox')

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and replace "KEY" with its key

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const { ALCHEMY_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env

module.exports = {
  solidity: '0.8.19',
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    hardhat: {
      chainId: 1337,
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      }
    }
  }
}
