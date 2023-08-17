import { render } from '@testing-library/react'

import Columns from './columns'

describe('Columns', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Columns />)
    expect(baseElement).toBeTruthy()
  })
})
