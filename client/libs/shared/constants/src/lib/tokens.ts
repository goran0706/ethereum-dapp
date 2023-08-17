export const tokensUrl = `https://gateway.ipfs.io/ipns/tokens.uniswap.org`

export const defaultTokenSelection = {
  name: 'Wrapped Ether',
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  symbol: 'WETH',
  decimals: 18,
  chainId: 1,
  logoURI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  extensions: {
    bridgeInfo: {
      '10': {
        tokenAddress: '0x4200000000000000000000000000000000000006'
      },
      '56': {
        tokenAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
      },
      '137': {
        tokenAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
      },
      '8453': {
        tokenAddress: '0x4200000000000000000000000000000000000006'
      },
      '42161': {
        tokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
      },
      '42220': {
        tokenAddress: '0x2DEf4285787d58a2f811AF24755A8150622f4361'
      },
      '43114': {
        tokenAddress: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB'
      },
      '84531': {
        tokenAddress: '0x4200000000000000000000000000000000000006'
      }
    }
  }
}
