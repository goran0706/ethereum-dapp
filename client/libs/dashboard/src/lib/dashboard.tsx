import { ContractsInfo } from '@shared/constants'
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

import {
  analyticsConfig,
  analyticsData,
  distributionData,
  featuresData
} from './data'

interface Feature {
  id: number
  Icon: IconType
  href: string
  color: string
  title: string
  description: string
}

interface Distribution {
  label: string
  data: unknown[]
}

// Todo: Replace hardcoded data with data from etherscan and contracts
export function Dashboard(): JSX.Element {
  const { data } = useToken({
    address: ContractsInfo.Token.address
  })

  const renderFeatureCard = ({
    id,
    Icon,
    href,
    color,
    title,
    description
  }: Feature) => (
    <FeatureCard
      key={id}
      Icon={Icon}
      href={href}
      color={color}
      title={title}
      description={description}
    />
  )

  const renderStat = (label: string, color: string) => (
    <Stat
      key={label}
      label={label}
      value={Number(data?.totalSupply.formatted)}
      symbol={data?.symbol}
      color={color}
      Icon={GiTwoCoins}
      isAnimated={true}
    />
  )

  const renderTokenDistributionChart = ({ label, data }: Distribution) => (
    <TokenDistributionChart key={label} title={label} data={data} />
  )

  return (
    <Stack gutter='2xxl'>
      <Stack>
        <Heading as='h1'>Welcome to [DApp]</Heading>
        <Grid $minItemWidth='260px' gutter='xl'>
          {featuresData.map(renderFeatureCard)}
        </Grid>
      </Stack>

      <Stack>
        <Heading as='h2'>Overview</Heading>
        <Grid $minItemWidth='260px' gutter='xl'>
          {renderStat('Total Value Locked', 'royalblue')}
          {renderStat('Total Supply', 'indigo')}
          {renderStat('Total Rewards', 'orange')}
          {renderStat('Market Cap', 'green')}
          {renderStat('Holders', 'purple')}
        </Grid>
        <AnalyticsChart chartConfig={analyticsConfig} data={analyticsData} />
      </Stack>

      <Stack>
        <Heading as='h3'>Token Distribution</Heading>
        <Grid $minItemWidth='260px' gutter='xl'>
          {distributionData.map(renderTokenDistributionChart)}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default Dashboard
