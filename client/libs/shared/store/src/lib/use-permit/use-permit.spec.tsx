import { act, renderHook } from '@testing-library/react'

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
