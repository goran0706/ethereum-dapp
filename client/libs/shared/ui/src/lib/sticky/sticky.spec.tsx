import { render } from '@testing-library/react'

import Sticky from './sticky'

describe('Sticky', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sticky />)
    expect(baseElement).toBeTruthy()
  })
})
