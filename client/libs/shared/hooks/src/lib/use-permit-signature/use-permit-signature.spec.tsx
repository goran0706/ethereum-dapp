import { act, renderHook } from '@testing-library/react'

import usePermitSignature from './use-permit-signature'

describe('usePermitSignature', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePermitSignature())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
