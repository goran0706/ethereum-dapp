import { render } from '@testing-library/react'

import PeriodSelect from './period-select'

describe('PeriodSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeriodSelect />)
    expect(baseElement).toBeTruthy()
  })
})
