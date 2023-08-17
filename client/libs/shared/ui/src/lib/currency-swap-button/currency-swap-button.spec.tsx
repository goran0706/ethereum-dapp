import { render } from '@testing-library/react'

import CurrencySwapButton from './currency-swap-button'

describe('CurrencySwapButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CurrencySwapButton />)
    expect(baseElement).toBeTruthy()
  })
})
