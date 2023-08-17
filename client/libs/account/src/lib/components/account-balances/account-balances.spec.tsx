import { render } from '@testing-library/react'

import AccountBalances from './account-balances'

describe('AccountBalances', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountBalances />)
    expect(baseElement).toBeTruthy()
  })
})
