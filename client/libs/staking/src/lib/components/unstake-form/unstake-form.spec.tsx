import { render } from '@testing-library/react'

import UnstakeForm from './unstake-form'

describe('UnstakeForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UnstakeForm />)
    expect(baseElement).toBeTruthy()
  })
})
