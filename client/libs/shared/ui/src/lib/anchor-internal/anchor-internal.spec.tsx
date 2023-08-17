import { render } from '@testing-library/react'

import AnchorInternal from './anchor-internal'

describe('AnchorInternal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnchorInternal />)
    expect(baseElement).toBeTruthy()
  })
})
