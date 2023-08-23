import { render } from '@testing-library/react'

import PermitSwitch from './permit-switch'

describe('PermitSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PermitSwitch />)
    expect(baseElement).toBeTruthy()
  })
})
