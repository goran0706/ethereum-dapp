export interface Token {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
  extensions: {
    bridgeInfo: {
      [key: string]: {
        tokenAddress: string
      }
    }
  }
}
