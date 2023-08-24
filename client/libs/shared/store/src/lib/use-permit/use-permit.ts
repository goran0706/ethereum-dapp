import { create } from 'zustand'

export interface PermitState {
  isPermitOn: boolean
  toggle: () => void
}

export const usePermit = create<PermitState>(set => ({
  isPermitOn: false,
  toggle: () => set(state => ({ isPermitOn: !state.isPermitOn }))
}))
