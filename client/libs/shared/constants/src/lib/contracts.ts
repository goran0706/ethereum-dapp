import { ContractRegistryABI, LockingABI, StakingABI, TokenABI } from '@abis'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const env = import.meta.env
const {
  VITE_TOKEN_ADDRESS,
  VITE_LOCKING_ADDRESS,
  VITE_STAKING_ADDRESS,
  VITE_CONTRACT_REGISTRY_ADDRESS
} = env

const ContractAddresses = {
  Token: VITE_TOKEN_ADDRESS,
  Locking: VITE_LOCKING_ADDRESS,
  Staking: VITE_STAKING_ADDRESS,
  ContractRegistry: VITE_CONTRACT_REGISTRY_ADDRESS
}

export const ContractsInfo = {
  Token: {
    abi: TokenABI,
    address: ContractAddresses.Token
  },
  Locking: {
    abi: LockingABI,
    address: ContractAddresses.Locking
  },
  Staking: {
    abi: StakingABI,
    address: ContractAddresses.Staking
  },
  ContractRegistry: {
    abi: ContractRegistryABI,
    address: ContractAddresses.ContractRegistry
  }
}

export default ContractsInfo
