import { render } from '@testing-library/react'

import TransactionAlert from './transaction-alert'

describe('TransactionAlert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TransactionAlert />)
    expect(baseElement).toBeTruthy()
  })
})
