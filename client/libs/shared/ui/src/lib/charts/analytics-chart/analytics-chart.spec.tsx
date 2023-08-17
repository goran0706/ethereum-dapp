import { render } from '@testing-library/react'

import AnalyticsChart from './analytics-chart'

describe('AnalyticsChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnalyticsChart />)
    expect(baseElement).toBeTruthy()
  })
})
