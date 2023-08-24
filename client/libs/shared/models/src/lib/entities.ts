import { Address, Hex, TypedDataDomain, TypedDataParameter } from 'viem'

export interface Token {
  chainId: number
  address: Hex
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

export interface ERC20 {
  address: Hex
  name(): Promise<string>
  symbol(): Promise<string>
  decimals(): Promise<string>
  totalSupply(): Promise<string>
  balanceOf(account: string): Promise<string>
  allowance(owner: string, spender: string): Promise<string>
  approve(spender: string, amount: string): Promise<boolean>
  transfer(to: string, amount: string): Promise<boolean>
  transferFrom(from: string, to: string, amount: string): Promise<boolean>
}

export interface ERC20Permit extends ERC20 {
  permit(
    owner: string,
    spender: string,
    value: string,
    deadline: string,
    v: number,
    r: string,
    s: string
  ): Promise<boolean>
  nonces(owner: string): Promise<number>
  DOMAIN_SEPARATOR(): Promise<string>
}

export interface Wallet {
  account: { address: Address }
  address: Address
  privateKey: string
  signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataParameter[]>,
    value: Record<string, any>
  ): Promise<Signature>
}

export interface Signature {
  v: number
  r: string
  s: string
}

export interface PermitConfig {
  nonce?: bigint
  name?: string
  chainId?: number
  version?: string
}
