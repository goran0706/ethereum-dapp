import { render } from '@testing-library/react'

import Limit from './limit'

describe('Limit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Limit />)
    expect(baseElement).toBeTruthy()
  })
})
