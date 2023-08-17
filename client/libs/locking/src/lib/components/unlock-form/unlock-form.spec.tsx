import { render } from '@testing-library/react'

import UnlockForm from './unlock-form'

describe('UnlockForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UnlockForm />)
    expect(baseElement).toBeTruthy()
  })
})
