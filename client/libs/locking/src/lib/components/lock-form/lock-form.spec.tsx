import { render } from '@testing-library/react'

import LockForm from './lock-form'

describe('LockForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LockForm />)
    expect(baseElement).toBeTruthy()
  })
})
