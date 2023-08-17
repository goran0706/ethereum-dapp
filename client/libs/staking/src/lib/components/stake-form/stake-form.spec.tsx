import { render } from '@testing-library/react'

import StakeForm from './stake-form'

describe('StakeForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StakeForm />)
    expect(baseElement).toBeTruthy()
  })
})
