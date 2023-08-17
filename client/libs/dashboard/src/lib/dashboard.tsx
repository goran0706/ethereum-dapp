import { Contracts } from '@shared/constants'
import {
  AnalyticsChart,
  FeatureCard,
  Grid,
  Heading,
  Stack,
  Stat,
  TokenDistributionChart
} from '@shared/ui'
import { IconType } from 'react-icons'
import { GiTwoCoins } from 'react-icons/gi'
import { useToken } from 'wagmi'

import { analyticsConfig, analyticsData, distributionData, featuresData } from './data'

interface Feature {
  id: number
  Icon: IconType
  href: string
  color: string
  title: string
  description: string
}

interface StatData {
  id: number
  label: string
  value: number
  symbol: string
  color: string
  Icon: IconType
}

interface Distribution {
  label: string
  data: unknown[]
}

export function Dashboard(): JSX.Element {
  const { data, isError, isLoading } = useToken({
    address: Contracts.Token
  })

  /* 
    Todo 1): Calculate TVL
    Todo 2): Show total rewards
    Todo 3): Calculate Market Cap or show Market Price
    Todo 4): Show holders count

    Todo 5): Pass the values to the area-chart component

    Todo 6): Show initial token distribution 
    Todo 7): show current token distribution 
    Todo 8): Show token balances of Locking contract 
    Todo 9): Show token balances of Staking contract  
    Todo 10): Show list of deployed smart contract addresses 
    Todo 11): Show supported tokens in token contract registry 
  */

  return (
    <Stack gutter='xxl'>
      <Stack>
        <Heading as='h1'>Welcome to [DApp]</Heading>
        <Grid $minItemWidth='260px' gutter='xl'>
          {featuresData.map(({ id, Icon, href, color, title, description }: Feature) => (
            <FeatureCard
              key={id}
              Icon={Icon}
              href={href}
              color={color}
              title={title}
              description={description}
            />
          ))}
        </Grid>
      </Stack>
      <Stack>
        <Heading as='h2'>Overview</Heading>
        <Grid $minItemWidth='260px' gutter='xl'>
          <Stat
            label='Total Value Locked'
            value={Number(data?.totalSupply.formatted)}
            symbol={data?.symbol}
            color='royalblue'
            Icon={GiTwoCoins}
            isAnimated={true}
          />
          <Stat
            label='Total Supply'
            value={Number(data?.totalSupply.formatted)}
            symbol={data?.symbol}
            color='indigo'
            Icon={GiTwoCoins}
            isAnimated={true}
          />
          <Stat
            label='Total Rewards'
            value={Number(data?.totalSupply.formatted)}
            symbol={data?.symbol}
            color='orange'
            Icon={GiTwoCoins}
            isAnimated={true}
          />
          <Stat
            label='Market Cap'
            value={Number(data?.totalSupply.formatted)}
            symbol={data?.symbol}
            color='green'
            Icon={GiTwoCoins}
            isAnimated={true}
          />
          <Stat
            label='Holders'
            value={Number(data?.totalSupply.formatted)}
            symbol={data?.symbol}
            color='purple'
            Icon={GiTwoCoins}
            isAnimated={true}
          />
        </Grid>
        <AnalyticsChart chartConfig={analyticsConfig} data={analyticsData} />
      </Stack>

      <Stack>
        <Heading as='h3'>Token Distribution</Heading>
        <Grid $minItemWidth='260px' gutter='xl'>
          {distributionData.map(({ label, data }: Distribution) => (
            <TokenDistributionChart key={label} title={label} data={data} />
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default Dashboard
