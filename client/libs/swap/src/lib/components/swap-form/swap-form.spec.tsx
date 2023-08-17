import { render } from '@testing-library/react'

import SwapForm from './swap-form'

describe('SwapForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SwapForm />)
    expect(baseElement).toBeTruthy()
  })
})
