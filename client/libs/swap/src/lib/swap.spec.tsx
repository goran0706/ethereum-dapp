import { render } from '@testing-library/react'

import Swap from './swap'

describe('Swap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Swap />)
    expect(baseElement).toBeTruthy()
  })
})
