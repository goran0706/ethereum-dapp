import { ContractRegistryABI, LockingABI, StakingABI, TokenABI } from '@abis'

enum ContractAddresses {
  Token = '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  Locking = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  Staking = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  ContractRegistry = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
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
