import { ContractsInfo } from '@shared/constants'
import { useCurrencyMask } from '@shared/store'
import { Grid, Heading, Stack, Stat } from '@shared/ui'
import { GiTwoCoins } from 'react-icons/gi'
import { useToken } from 'wagmi'

import useAccountBalances from './use-account-balances/use-account-balances'

const AccountBalances = () => {
  const balances = useAccountBalances()
  const { isCurrencyMasked } = useCurrencyMask()
  const { data, isError } = useToken({
    address: ContractsInfo.Token.address
  })

  if (isError) return null

  const renderBalanceStat = (label: string, value: number, color: string) => (
    <Stat
      label={label}
      value={value}
      symbol={data?.symbol}
      color={color}
      Icon={GiTwoCoins}
      isCurrencyMasked={isCurrencyMasked}
      isAnimated={true}
    />
  )

  return (
    <Stack>
      <Heading as='h2'>Balances</Heading>
      <Grid $minItemWidth='260px' gutter='xl'>
        {renderBalanceStat('Wallet', balances.lmxBalance, 'crimson')}
        {renderBalanceStat('Locked', balances.lmxLockedBalance, 'blue')}
        {renderBalanceStat('Staked', balances.lmxStakedBalance, 'green')}
        {renderBalanceStat('Net worth', balances.netWorth, 'gold')}
      </Grid>
    </Stack>
  )
}

export default AccountBalances
