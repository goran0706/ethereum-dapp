import { render } from '@testing-library/react'

import TokenDistributionChart from './token-distribution-chart'

describe('TokenDistributionChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenDistributionChart />)
    expect(baseElement).toBeTruthy()
  })
})
