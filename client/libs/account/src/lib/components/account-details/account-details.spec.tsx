import { render } from '@testing-library/react'

import AccountDetails from './account-details'

describe('AccountDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountDetails />)
    expect(baseElement).toBeTruthy()
  })
})
