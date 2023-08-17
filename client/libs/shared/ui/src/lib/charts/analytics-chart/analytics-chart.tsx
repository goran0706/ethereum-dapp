import { device } from '@shared/constants'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import styled from 'styled-components'

import { Panel } from '../../panel/panel'

export interface AnalyticsChartProps {
  chartConfig: {
    defs: any[]
    areas: any[]
  }
  data: any[]
}

const Container = styled(ResponsiveContainer)`
  height: 400px !important;
  width: 99% !important;
  aspect: 3;

  @media ${device.sm} {
    height: 200px !important;
  }
`

export function AnalyticsChart({ chartConfig, data }: AnalyticsChartProps) {
  return (
    <Panel>
      <Container>
        <AreaChart data={data}>
          <defs>
            {chartConfig.defs.map(def => (
              <linearGradient key={def.colorId} id={def.colorId} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={def.colorValue} stopOpacity={0.8} />
                <stop offset='95%' stopColor={def.colorValue} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          {chartConfig.areas.map(area => (
            <Area
              key={area.dataKey}
              type='monotone'
              dataKey={area.dataKey}
              stroke={area.colorValue}
              fillOpacity={1}
              fill={`url(#${area.colorId})`}
            />
          ))}
        </AreaChart>
      </Container>
    </Panel>
  )
}

export default AnalyticsChart
