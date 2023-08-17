import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import useCurrencyMask from './use-currency-mask'

describe('useCurrencyMask', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCurrencyMask())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
