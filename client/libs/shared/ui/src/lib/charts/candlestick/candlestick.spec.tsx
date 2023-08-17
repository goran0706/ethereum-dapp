import { render } from '@testing-library/react'

import Candlestick from './candlestick'

describe('Candlestick', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Candlestick />)
    expect(baseElement).toBeTruthy()
  })
})
