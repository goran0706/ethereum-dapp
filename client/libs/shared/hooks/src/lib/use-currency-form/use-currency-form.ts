import {
  ContractsInfo,
  Periods,
  defaultPeriodSelection
} from '@shared/constants'
import { Token } from '@shared/models'
import { useCurrencySelect } from '@shared/store'
import { formatError } from '@utils'
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useReducer
} from 'react'
import { formatEther } from 'viem'
import { useAccount, useBalance, useContractRead } from 'wagmi'

// Todo: recheck types
interface CurrencyFormProps {
  balance: bigint
  currencyIn: Token
  currencyInAmount: string
  currencyOut: Token
  currencyOutAmount: string
  errorMessage: string
  isPermitOn: boolean
  limitPrice: string
  staked: bigint
  locked: bigint
  lockTime: Periods
  incrementBalance: (value: bigint) => void
  decrementBalance: (value: bigint) => void
  handleBalancePercentageClick: (e: MouseEvent<HTMLButtonElement>) => void
  handleCurrencyInAmountChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleCurrencyOutAmountChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleCurrencySwap: () => void
  handleError: (err: unknown) => void
  handleErrorClear: () => void
  handleLimitPriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleStakedPercentageClick: (e: MouseEvent<HTMLButtonElement>) => void
  handleLockedPercentageClick: (e: MouseEvent<HTMLButtonElement>) => void
  handleLockTimeChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleResetLockTime: () => void
  handleSetToMarketPriceClick: (marketPrice: bigint) => void
  handleSubmit: (e: FormEvent, callback: () => void) => void
  handleTogglePermit: () => void
}

type State = {
  balance: bigint
  currencyInAmount: string
  currencyOutAmount: string
  errorMessage: string
  isPermitOn: boolean
  limitPrice: string
  staked: bigint
  locked: bigint
  lockTime: Periods
}

type Action =
  | { type: 'CLEAR_ERROR_MESSAGE' }
  | { type: 'SET_BALANCE'; payload: bigint }
  | { type: 'SET_CURRENCY_IN_AMOUNT'; payload: string }
  | { type: 'SET_CURRENCY_OUT_AMOUNT'; payload: string }
  | { type: 'SET_ERROR_MESSAGE'; payload: string }
  | { type: 'SET_LIMIT_PRICE'; payload: string }
  | { type: 'SET_LOCK_TIME'; payload: Periods }
  | { type: 'SET_STAKED'; payload: bigint }
  | { type: 'SET_LOCKED'; payload: bigint }
  | { type: 'TOGGLE_PERMIT'; payload: boolean }

const ActionTypes = {
  CLEAR_ERROR_MESSAGE: 'CLEAR_ERROR_MESSAGE',
  SET_BALANCE: 'SET_BALANCE',
  SET_CURRENCY_IN_AMOUNT: 'SET_CURRENCY_IN_AMOUNT',
  SET_CURRENCY_OUT_AMOUNT: 'SET_CURRENCY_OUT_AMOUNT',
  SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
  SET_LIMIT_PRICE: 'SET_LIMIT_PRICE',
  SET_LOCK_TIME: 'SET_LOCK_TIME',
  SET_STAKED: 'SET_STAKED',
  SET_LOCKED: 'SET_LOCKED',
  TOGGLE_PERMIT: 'TOGGLE_PERMIT'
} as const

type ActionType = (typeof ActionTypes)[keyof typeof ActionTypes]

type ActionPayloads = {
  [ActionTypes.CLEAR_ERROR_MESSAGE]: string
  [ActionTypes.SET_BALANCE]: bigint
  [ActionTypes.SET_CURRENCY_IN_AMOUNT]: bigint
  [ActionTypes.SET_CURRENCY_OUT_AMOUNT]: bigint
  [ActionTypes.SET_ERROR_MESSAGE]: string
  [ActionTypes.SET_LIMIT_PRICE]: bigint
  [ActionTypes.SET_LOCK_TIME]: Periods
  [ActionTypes.SET_STAKED]: bigint
  [ActionTypes.SET_LOCKED]: bigint
  [ActionTypes.TOGGLE_PERMIT]: boolean
}

const initialState: State = {
  balance: BigInt(0),
  currencyInAmount: '',
  currencyOutAmount: '',
  errorMessage: '',
  isPermitOn: false,
  limitPrice: '',
  staked: BigInt(0),
  locked: BigInt(0),
  lockTime: defaultPeriodSelection
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_BALANCE':
      return { ...state, balance: action.payload }
    case 'SET_CURRENCY_IN_AMOUNT':
      return { ...state, currencyInAmount: action.payload }
    case 'SET_CURRENCY_OUT_AMOUNT':
      return { ...state, currencyOutAmount: action.payload }
    case 'SET_LIMIT_PRICE':
      return { ...state, limitPrice: action.payload }
    case 'SET_LOCK_TIME':
      return { ...state, lockTime: action.payload }
    case 'SET_STAKED':
      return { ...state, staked: action.payload }
    case 'SET_LOCKED':
      return { ...state, locked: action.payload }
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload }
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, errorMessage: '' }
    case 'TOGGLE_PERMIT':
      return { ...state, isPermitOn: action.payload }
    default:
      return state
  }
}

export function useCurrencyForm(): CurrencyFormProps {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    balance,
    currencyInAmount,
    currencyOutAmount,
    errorMessage,
    isPermitOn,
    limitPrice,
    staked,
    locked,
    lockTime
  } = state

  const { address } = useAccount()
  const { currencyIn, setCurrencyIn, currencyOut, setCurrencyOut } =
    useCurrencySelect()

  const { data: balanceLMX } = useBalance({
    address: address,
    token: ContractsInfo.Token.address
  })

  const { data: lockedLMX } = useContractRead({
    ...ContractsInfo.Locking,
    functionName: 'lockedBalances',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    args: [address]
  })

  const { data: stakedLMX } = useContractRead({
    ...ContractsInfo.Staking,
    functionName: 'stakedBalances',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    args: [ContractsInfo.Token.address, address]
  })

  useEffect(() => {
    if (balanceLMX) {
      updateState(ActionTypes.SET_BALANCE, balanceLMX.formatted)
    }
    if (lockedLMX) {
      updateState(ActionTypes.SET_LOCKED, BigInt(formatEther(lockedLMX[0])))
    }
    if (stakedLMX) {
      updateState(ActionTypes.SET_LOCKED, BigInt(formatEther(stakedLMX)))
    }
  }, [balanceLMX, lockedLMX, stakedLMX])

  function updateState(
    type: ActionType,
    payload?: ActionPayloads[ActionType]
  ): void {
    const action = { type, payload } as Action
    dispatch(action)
  }

  const handleTogglePermit = () => {
    updateState(ActionTypes.TOGGLE_PERMIT, !isPermitOn)
  }

  const incrementBalance = (value: bigint) => {
    updateState(ActionTypes.SET_BALANCE, balance + value)
  }

  const decrementBalance = (value: bigint) => {
    updateState(ActionTypes.SET_BALANCE, balance - value)
  }

  const handleLockTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateState(ActionTypes.SET_LOCK_TIME, value)
  }

  const handleCurrencyInAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateState(ActionTypes.SET_CURRENCY_IN_AMOUNT, value)
  }

  const handleCurrencyOutAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateState(ActionTypes.SET_CURRENCY_OUT_AMOUNT, value)
  }

  const handleLimitPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateState(ActionTypes.SET_LIMIT_PRICE, value)
  }

  const handleCurrencySwap = () => {
    setCurrencyOut(currencyIn)
    setCurrencyIn(currencyOut)
    updateState(ActionTypes.SET_CURRENCY_IN_AMOUNT, currencyOutAmount)
    updateState(ActionTypes.SET_CURRENCY_OUT_AMOUNT, currencyInAmount)
  }

  const handleSetToMarketPriceClick = (marketPrice: bigint) => {
    updateState(ActionTypes.SET_LIMIT_PRICE, marketPrice)
  }

  const handleBalancePercentageClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const button = e.currentTarget
    const percent = parseFloat(button.dataset.percent || '0')
    const amount = (BigInt(balance) * BigInt(percent)) / BigInt(100) // balance
    updateState(ActionTypes.SET_CURRENCY_IN_AMOUNT, amount.toString())
  }

  const handleStakedPercentageClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const button = e.currentTarget
    const percent = parseFloat(button.dataset.percent || '0')
    const amount = (BigInt(staked) * BigInt(percent)) / BigInt(100) // staked
    updateState(ActionTypes.SET_CURRENCY_IN_AMOUNT, amount.toString())
  }

  const handleLockedPercentageClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const button = e.currentTarget
    const percent = parseFloat(button.dataset.percent || '0')
    const amount = (BigInt(locked) * BigInt(percent)) / BigInt(100) // locked
    updateState(ActionTypes.SET_CURRENCY_IN_AMOUNT, amount.toString())
  }

  const handleResetLockTime = () => {
    updateState(ActionTypes.SET_LOCK_TIME, defaultPeriodSelection)
  }

  const handleError = (err: unknown) => {
    if (typeof err === 'string' || err instanceof Error) {
      const errorWithMessage = typeof err === 'string' ? err : err.message
      const formattedError = formatError(errorWithMessage)
      updateState(ActionTypes.SET_ERROR_MESSAGE, formattedError)
    }
  }

  const clearError = () => {
    updateState(ActionTypes.CLEAR_ERROR_MESSAGE)
  }

  const handleSubmit = (e: FormEvent, callback: () => void) => {
    e.preventDefault()
    callback()
  }

  return {
    balance,
    currencyIn,
    currencyInAmount,
    currencyOut,
    currencyOutAmount,
    errorMessage,
    isPermitOn,
    limitPrice,
    staked,
    locked,
    lockTime,
    incrementBalance,
    decrementBalance,
    handleBalancePercentageClick,
    handleCurrencyInAmountChange,
    handleCurrencyOutAmountChange,
    handleCurrencySwap,
    handleError,
    handleErrorClear: clearError,
    handleLimitPriceChange,
    handleStakedPercentageClick,
    handleLockedPercentageClick,
    handleLockTimeChange,
    handleResetLockTime,
    handleSetToMarketPriceClick,
    handleSubmit,
    handleTogglePermit
  }
}

export default useCurrencyForm
