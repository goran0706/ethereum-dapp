import { render } from '@testing-library/react'

import RemoveAndUnstake from './remove-liquidity-form'

describe('RemoveLiquidityForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RemoveAndUnstake />)
    expect(baseElement).toBeTruthy()
  })
})
