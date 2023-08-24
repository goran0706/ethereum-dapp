import { render } from '@testing-library/react'

import AddAndStakeForm from './add-liquidity-form'

describe('AddLiquidityForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddAndStakeForm />)
    expect(baseElement).toBeTruthy()
  })
})
