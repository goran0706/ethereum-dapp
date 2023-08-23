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
import { ChangeEvent, FormEvent, useState } from 'react'

import TargetPriceInputPanel from '../target-price-input-panel/target-price-input-panel'

const LimitOrderForm: React.FC = () => {
  const {
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
    error
  } = useCurrencyForm()

  const [networkFee] = useState(4.23)
  const marketPrice = '1800'
  const rate = 1.3
  const fiatAmount = 1800
  const balanceAmount = 100
  const balanceLabel = 'Balance'

  const transactionDetails = [
    { label: 'Network Fee', value: `~${networkFee}` },
    {
      label: `Est. ${currencyIn.symbol} sell price`,
      value: `${route?.estSellPrice ?? 0} ${currencyOut.symbol}`
    },
    {
      label: `Est. ${currencyOut.symbol} buy price`,
      value: `${route?.estBuyPrice ?? 0} ${currencyIn.symbol}`
    },
    {
      label: `Min ${currencyIn.symbol} sell price`,
      value: `${route?.minSellPrice ?? 0} ${currencyOut.symbol}`
    },
    {
      label: `Min ${currencyOut.symbol} buy price`,
      value: `${route?.minBuyPrice ?? 0} ${currencyIn.symbol}`
    }
  ]

  const handleCurrencyInAmountChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
    setCurrencyInAmount(value)
  }

  const handleCurrencyOutAmountChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
    setCurrencyOutAmount(value)
  }

  const handleLimitPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setLimitPrice(value)
  }

  const handleSetToMarketPrice = () => {
    setLimitPrice(marketPrice)
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
      `Created Limit Order ${currencyInAmount} ${currencyIn.symbol} for ${currencyOutAmount} ${currencyOut.symbol}`
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
              <TargetPriceInputPanel
                price={limitPrice}
                onPriceChange={handleLimitPriceChange}
                onSetToMarketPriceClick={handleSetToMarketPrice}
                currencySymbol={currencyIn.symbol}
                rate={rate}
              />
            </Stack>
            {networkFee && <TransactionDetails items={transactionDetails} />}
            {error && <TransactionAlert color='red' message={error.message} />}
            <Button
              size='large'
              onClick={handleSubmit}
              disabled={!currencyInAmount}
            >
              Create Limit Order
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default LimitOrderForm
