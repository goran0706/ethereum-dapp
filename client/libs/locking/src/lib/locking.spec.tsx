import { render } from '@testing-library/react'

import Locking from './locking'

describe('Locking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Locking />)
    expect(baseElement).toBeTruthy()
  })
})
