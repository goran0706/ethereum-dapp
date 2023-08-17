import { render } from '@testing-library/react'

import StakingContent from './staking-content'

describe('StakingContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StakingContent />)
    expect(baseElement).toBeTruthy()
  })
})
