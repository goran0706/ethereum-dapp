import { ContractsInfo } from '@shared/constants'
import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { useAccount, useContractReads } from 'wagmi'

interface Balances {
  lmxBalance: number
  lmxLockedBalance: number
  lmxStakedBalance: number
  netWorth: number
}

const useAccountBalances = () => {
  const [balances, setBalances] = useState<Balances>({
    lmxBalance: 0,
    lmxLockedBalance: 0,
    lmxStakedBalance: 0,
    netWorth: 0
  })

  const { address } = useAccount()
  const { data: lmxBalances } = useContractReads({
    contracts: [
      {
        ...ContractsInfo.Token,
        functionName: 'balanceOf',
        args: address && [address]
      },
      {
        ...ContractsInfo.Locking,
        functionName: 'getLockDetails',
        args: address && [address]
      },
      {
        ...ContractsInfo.Staking,
        functionName: 'stakedBalances',
        args: address && [address, ContractsInfo.Token.address]
      }
    ]
  })

  useEffect(() => {
    if (lmxBalances) {
      const lmxBalanceBigint = lmxBalances[0]?.result as bigint
      const lmxLockedBalanceBigint = (
        lmxBalances[1]?.result as { amount: bigint }
      )?.amount
      const lmxStakedBalanceBigint = lmxBalances[2]?.result as bigint

      const lmxBalance = formatEther(lmxBalanceBigint ?? BigInt(0))
      const lmxLockedBalance = formatEther(lmxLockedBalanceBigint ?? BigInt(0))
      const lmxStakedBalance = formatEther(lmxStakedBalanceBigint ?? BigInt(0))

      const netWorth = lmxBalance + lmxLockedBalance + lmxStakedBalance

      setBalances({
        lmxBalance: Number(lmxBalance),
        lmxLockedBalance: Number(lmxLockedBalance),
        lmxStakedBalance: Number(lmxStakedBalance),
        netWorth: Number(netWorth)
      })
    }
  }, [lmxBalances])

  return balances
}

export default useAccountBalances
