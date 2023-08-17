import { render } from '@testing-library/react'

import LockingContent from './locking-content'

describe('LockingContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LockingContent />)
    expect(baseElement).toBeTruthy()
  })
})
