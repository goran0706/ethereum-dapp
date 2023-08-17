import { defaultPeriodSelection } from '@shared/constants'
import { useCurrencySelect } from '@shared/store'
import { useEffect, useState } from 'react'

export function useCurrencyForm() {
  const { currencyIn, setCurrencyIn, currencyOut, setCurrencyOut } = useCurrencySelect()

  const [lockTime, setLockTime] = useState<number>(defaultPeriodSelection)
  const [currencyInAmount, setCurrencyInAmount] = useState('')
  const [currencyOutAmount, setCurrencyOutAmount] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [route, setRoute] = useState<any>()
  const [error, setError] = useState<Error>()
  const resetLockTime = () => setLockTime(defaultPeriodSelection)

  useEffect(() => {
    if (currencyIn && currencyInAmount && currencyOut && currencyOutAmount) {
      setRoute({
        routes: `${currencyIn.symbol} > ${currencyOut.symbol}`,
        estSellPrice: 1829.12,
        estBuyPrice: 0.00054671,
        minSellPrice: 1811.72,
        minBuyPrice: 0.00055196
      })

      setError(new Error('High price impact! More than 100% drop!'))
    }
  }, [currencyIn, currencyInAmount, currencyOut, currencyOutAmount])

  return {
    lockTime,
    setLockTime,
    resetLockTime,
    currencyIn,
    setCurrencyIn,
    currencyOut,
    setCurrencyOut,
    currencyInAmount,
    setCurrencyInAmount,
    currencyOutAmount,
    setCurrencyOutAmount,
    limitPrice,
    setLimitPrice,
    route,
    error,
    setError
  }
}

export default useCurrencyForm
