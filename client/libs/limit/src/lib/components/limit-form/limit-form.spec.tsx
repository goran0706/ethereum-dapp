import { render } from '@testing-library/react'

import LimitForm from './limit-form'

describe('LimitForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LimitForm />)
    expect(baseElement).toBeTruthy()
  })
})
