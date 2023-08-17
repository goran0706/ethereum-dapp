import { create } from 'zustand'

export interface MaskingState {
  isCurrencyMasked: boolean
  toggle: () => void
}

export const useCurrencyMask = create<MaskingState>(set => ({
  isCurrencyMasked: false,
  toggle: () => set(state => ({ isCurrencyMasked: !state.isCurrencyMasked }))
}))
