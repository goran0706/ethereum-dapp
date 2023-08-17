import { render } from '@testing-library/react'

import AccountActivity from './account-activity'

describe('AccountActivity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountActivity />)
    expect(baseElement).toBeTruthy()
  })
})
