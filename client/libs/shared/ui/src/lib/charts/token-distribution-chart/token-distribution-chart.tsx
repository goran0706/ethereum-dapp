import { Cell, Pie, PieChart } from 'recharts'

import Center from '../../center/center'
import Heading from '../../heading/heading'
import Panel from '../../panel/panel'

// Define colors for the PieChart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export interface TokenDistributionChartProps {
  title: string
  data: any[]
}

export function TokenDistributionChart({ title, data }: TokenDistributionChartProps) {
  return (
    <Panel>
      <Center $centerText $centerChildren>
        <Heading as='h3'>{title}</Heading>
      </Center>
      <Center $centerText $centerChildren>
        <PieChart width={280} height={240}>
          <Pie
            data={data}
            cx={140}
            cy={120}
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
            paddingAngle={5}
            dataKey='value'
            // @ts-expect-error PieLabel
            label='value'
          >
            {data.map((_: string, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Center>
    </Panel>
  )
}

export default TokenDistributionChart
