import { useCurrencyForm } from '@shared/hooks'
import {
  Button,
  CurrencyInputPanel,
  CurrencySwapButton,
  Form,
  Panel,
  Stack,
  TransactionAlert,
  TransactionDetails
} from '@shared/ui'
import React, { ChangeEvent, FormEvent } from 'react'

function SwapForm() {
  const {
    lockTime,
    currencyIn,
    setCurrencyIn,
    currencyOut,
    setCurrencyOut,
    currencyInAmount,
    setCurrencyInAmount,
    currencyOutAmount,
    setCurrencyOutAmount,
    error
  } = useCurrencyForm()

  const networkFee = 4.23
  const fiatAmount = 1800
  const balanceAmount = 100
  const balanceLabel = 'Balance'

  const transactionDetails = [{ label: 'Network Fee', value: `~${networkFee}` }]

  const handleCurrencyInAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCurrencyInAmount(value)
  }

  const handleCurrencyOutAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCurrencyOutAmount(value)
  }

  const handlePercentageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const button = e.currentTarget as HTMLButtonElement
    const percentStr = button.getAttribute('data-percent')
    if (percentStr !== null) {
      const percent = parseFloat(percentStr)
      const result = (percent / balanceAmount) * 100
      setCurrencyInAmount(result.toString())
    }
  }

  const handleCurrencySwap = () => {
    setCurrencyIn(currencyOut)
    setCurrencyInAmount(currencyOutAmount)
    setCurrencyOut(currencyIn)
    setCurrencyOutAmount(currencyInAmount)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    alert(
      `Swap ${currencyInAmount} ${currencyIn.symbol} for ${currencyOutAmount} ${currencyOut.symbol}`
    )
  }

  return (
    <Panel width='480px' height='fit-content'>
      <Stack>
        <Form>
          <Stack>
            <Stack gutter='md'>
              <CurrencyInputPanel
                currency={currencyIn}
                onCurrencyChange={setCurrencyIn}
                currencyAmount={currencyInAmount}
                onCurrencyAmountChange={handleCurrencyInAmountChange}
                fiatAmount={fiatAmount}
                balanceAmount={balanceAmount}
                balanceLabel={balanceLabel}
                renderCurrencyBalance
                renderCurrencySelector
                renderPercentageButtons
                onPercentageClick={handlePercentageClick}
              />
              <CurrencySwapButton onClick={handleCurrencySwap} />
              <CurrencyInputPanel
                currency={currencyOut}
                onCurrencyChange={setCurrencyOut}
                currencyAmount={currencyOutAmount}
                onCurrencyAmountChange={handleCurrencyOutAmountChange}
                fiatAmount={fiatAmount}
                balanceAmount={balanceAmount}
                balanceLabel={balanceLabel}
                renderCurrencyBalance
                renderCurrencySelector
              />
            </Stack>
            {networkFee && <TransactionDetails items={transactionDetails} />}
            {error && <TransactionAlert color='red' message={error.message} />}
            <Button size='large' onClick={handleSubmit} disabled={!currencyInAmount || !lockTime}>
              Swap
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default SwapForm
