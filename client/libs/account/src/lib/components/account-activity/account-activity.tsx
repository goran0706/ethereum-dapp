import { ContractsInfo } from '@shared/constants'
import { Heading, Stack, Table, Tag, Text, TextButton } from '@shared/ui'
import { shortenAddress } from '@utils'
import { useEffect, useState } from 'react'
import { formatEther, parseAbi } from 'viem'
import { useAccount, useNetwork, usePublicClient } from 'wagmi'

export const AccountActivity = () => {
  const [activity, setActivity] = useState<any[]>([])
  const { chain } = useNetwork()
  const { address } = useAccount()
  const publicClient = usePublicClient()

  useEffect(() => {
    if (!address) return

    const fetchLogs = async () => {
      const tokenLogs = await publicClient.getLogs({
        address: ContractsInfo.Token.address,
        events: parseAbi([
          'event Approval(address indexed owner, address indexed sender, uint256 value)',
          'event Transfer(address indexed from, address indexed to, uint256 value)'
        ]),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        args: {
          from: address
        }
      })
      const lockingLogs = await publicClient.getLogs({
        address: ContractsInfo.Locking.address,
        events: parseAbi([
          'event TokensLocked( address indexed beneficiary, uint256 amount, uint256 unlockTime)',
          'event TokensUnlocked( address indexed beneficiary, uint256 amount, uint256 fee)'
        ]),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        args: {
          from: address
        }
      })
      const stakingLogs = await publicClient.getLogs({
        address: ContractsInfo.Staking.address,
        events: parseAbi([
          'event Staked(address indexed user, address token, uint256 amount)',
          'event Unstaked(address indexed user, address token, uint256 amount)',
          'event RewardsDistributed(address indexed token, uint256 amount)',
          'event LiquidityAdded( address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut)',
          'event LiquidityRemoved( address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut)'
        ]),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        args: {
          from: address
        }
      })

      setActivity([...tokenLogs, ...lockingLogs, ...stakingLogs])
    }

    fetchLogs()
  }, [address, publicClient])

  if (!address) return null

  return (
    <Stack>
      <Heading as='h3'>Activity</Heading>
      <Table columns='150px 250px 250px 200px 1fr 100px'>
        <Table.Header key='header'>
          <Text>Event</Text>
          <Text>From</Text>
          <Text>To</Text>
          <Text>Amount</Text>
          <Text>Transaction</Text>
        </Table.Header>
        {activity.map((tx, index: number) => {
          const tagColor = tx.args.from === address ? 'red' : 'green'
          const from = tx.args.from || tx.args.owner || tx.args.beneficiary
          const to = tx.args.to || tx.args.spender || tx.args.sender
          const blockExplorerLink =
            `${chain?.blockExplorers?.default.url}/tx/${tx.transactionHash}` ??
            `https://etherscan.io/tx/${tx.transactionHash}`

          return (
            <Table.Row key={index}>
              <Tag type='blue'>{tx.eventName}</Tag>
              <Text>{shortenAddress(from, 10)}</Text>
              <Text>{shortenAddress(to, 10)}</Text>
              <Tag type={tagColor}>
                {formatEther(tx.args.value ?? tx.args.amount)} LMX
              </Tag>
              <Text>{shortenAddress(tx.transactionHash, 20)}</Text>
              <TextButton as='a' href={blockExplorerLink} target='_blank'>
                Details
              </TextButton>
            </Table.Row>
          )
        })}
      </Table>
    </Stack>
  )
}

export default AccountActivity
