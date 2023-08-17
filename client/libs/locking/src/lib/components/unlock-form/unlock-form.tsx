import { useCurrencyForm } from '@shared/hooks'
import {
  AnchorInternal,
  Button,
  CurrencyInputPanel,
  Flex,
  Form,
  Panel,
  Stack,
  TransactionAlert,
  TransactionDetails
} from '@shared/ui'
import { ChangeEvent, FormEvent } from 'react'

export function UnlockForm() {
  const { lockTime, currencyIn, setCurrencyIn, currencyInAmount, setCurrencyInAmount, error } =
    useCurrencyForm()

  const networkFee = 4.23
  const fiatAmount = 1800
  const balanceAmount = 100
  const balanceLabel = 'Balance'

  const handleCurrencyInAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCurrencyInAmount(value)
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    alert(`Unlock ${currencyInAmount} ${currencyIn.symbol}`)
  }

  return (
    <Panel width='480px' height='fit-content'>
      <Stack>
        <Flex>
          <AnchorInternal to='/locking/lock'>Lock</AnchorInternal>
          <AnchorInternal to='/locking/unlock'>Unlock</AnchorInternal>
        </Flex>
        <Form onSubmit={handleSubmit}>
          <Stack>
            <CurrencyInputPanel
              currency={currencyIn}
              onCurrencyChange={setCurrencyIn}
              currencyAmount={currencyInAmount}
              onCurrencyAmountChange={handleCurrencyInAmountChange}
              fiatAmount={fiatAmount}
              balanceAmount={balanceAmount}
              balanceLabel={balanceLabel}
              renderNativeToken
              renderCurrencyBalance
              renderPercentageButtons
              onPercentageClick={handlePercentageClick}
            />
            {networkFee && (
              <TransactionDetails items={[{ label: 'Network Fee', value: `~${networkFee}` }]} />
            )}
            {error && <TransactionAlert color='red' message={error.message} />}
            <Button size='large' type='submit' disabled={!currencyInAmount || !lockTime}>
              Unlock
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default UnlockForm
