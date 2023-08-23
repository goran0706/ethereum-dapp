import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import usePermit from './use-permit'

describe('usePermit', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePermit())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
