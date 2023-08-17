import { render } from '@testing-library/react'

import Mask from './mask'

describe('Mask', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Mask />)
    expect(baseElement).toBeTruthy()
  })
})
