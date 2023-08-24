/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defaultTokenSelection } from '@shared/constants'
import { Token } from '@shared/models'
import { create } from 'zustand'

export interface CurrencyState {
  currencyIn: Token
  currencyOut: Token
  setCurrencyIn: (value: Token) => void
  setCurrencyOut: (value: Token) => void
}

export const useCurrencySelect = create<CurrencyState>(set => ({
  //@ts-ignore
  currencyIn: defaultTokenSelection,
  //@ts-ignore
  currencyOut: defaultTokenSelection,
  setCurrencyIn: currencyIn => set({ currencyIn }),
  setCurrencyOut: currencyOut => set({ currencyOut })
}))
