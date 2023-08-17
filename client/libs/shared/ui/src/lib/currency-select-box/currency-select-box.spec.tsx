import { render } from '@testing-library/react'

import CurrencySelectBox from './currency-select-box'

describe('CurrencySelectBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CurrencySelectBox />)
    expect(baseElement).toBeTruthy()
  })
})
