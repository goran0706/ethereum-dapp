import { render } from '@testing-library/react'

import Staking from './staking'

describe('Staking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Staking />)
    expect(baseElement).toBeTruthy()
  })
})
