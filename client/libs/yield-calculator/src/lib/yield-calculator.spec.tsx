import { render } from '@testing-library/react'

import YieldCalculator from './yield-calculator'

describe('YieldCalculator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<YieldCalculator />)
    expect(baseElement).toBeTruthy()
  })
})
