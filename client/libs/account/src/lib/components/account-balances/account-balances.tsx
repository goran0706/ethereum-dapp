import { Contracts } from '@shared/constants'
import { useCurrencyMask } from '@shared/store'
import { Grid, Heading, Stack, Stat } from '@shared/ui'
import { GiTwoCoins } from 'react-icons/gi'
import { useBalance } from 'wagmi'

export const AccountBalances = () => {
  const { isCurrencyMasked } = useCurrencyMask()

  const { data, isError, isLoading } = useBalance({
    address: Contracts.Token,
    token: Contracts.Token
  })

  const balances = [
    {
      label: 'Balance',
      value: Number(data?.formatted),
      symbol: data?.symbol,
      color: 'crimson'
    },
    {
      label: 'Locked',
      value: Number(data?.formatted),
      symbol: data?.symbol,
      color: 'blue'
    },
    {
      label: 'Staked',
      value: Number(data?.formatted),
      symbol: data?.symbol,
      color: 'green'
    },
    {
      label: 'Net worth',
      value: Number(data?.formatted),
      symbol: data?.symbol,
      color: 'gold'
    }
  ]

  return (
    <Stack>
      <Heading as='h2'>Balances</Heading>
      <Grid $minItemWidth='260px' gutter='xl'>
        {balances.map(balance => (
          <Stat
            key={balance.label}
            label={balance.label}
            value={balance.value}
            symbol={balance.symbol}
            color={balance.color}
            Icon={GiTwoCoins}
            isCurrencyMasked={isCurrencyMasked}
          />
        ))}
      </Grid>
    </Stack>
  )
}

export default AccountBalances
