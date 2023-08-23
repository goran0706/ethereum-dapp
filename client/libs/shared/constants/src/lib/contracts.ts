import { ContractRegistryABI, LockingABI, StakingABI, TokenABI } from '@abis'

enum ContractAddresses {
  Token = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  Locking = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
  Staking = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  ContractRegistry = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788'
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
