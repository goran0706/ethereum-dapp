import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import useAccountBalances from './use-account-balances'

describe('useAccountBalances', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useAccountBalances())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
