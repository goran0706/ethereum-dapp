import { act, renderHook } from '@testing-library/react'

import useCurrencyForm from './use-currency-form'

describe('useCurrencyForm', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCurrencyForm())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
