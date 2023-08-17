import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import useCurrencySelect from './use-currency-select'

describe('useCurrencySelect', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCurrencySelect())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
