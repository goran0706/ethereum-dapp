import { render } from '@testing-library/react'

import Preferences from './preferences'

describe('Preferences', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Preferences />)
    expect(baseElement).toBeTruthy()
  })
})
