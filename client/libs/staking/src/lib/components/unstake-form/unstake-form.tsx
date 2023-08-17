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

export function UnstakeForm() {
  const { lockTime, currencyIn, setCurrencyIn, currencyInAmount, setCurrencyInAmount, error } =
    useCurrencyForm()

  // TODO
  const networkFee = 4.23
  const fiatAmount = 1800
  const balanceAmount = 100
  const balanceLabel = 'Balance'

  const transactionDetails = [{ label: 'Network Fee', value: `~${networkFee}` }]

  const handleCurrencyInAmountChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
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
    alert(`Unstake ${currencyInAmount} ${currencyIn.symbol}`)
  }

  return (
    <Panel width='480px' height='fit-content'>
      <Stack>
        <Flex>
          <AnchorInternal to='/staking/stake'>Stake</AnchorInternal>
          <AnchorInternal to='/staking/unstake'>Unstake</AnchorInternal>
        </Flex>
        <Form>
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
            {networkFee && <TransactionDetails items={transactionDetails} />}
            {error && <TransactionAlert color='red' message={error.message} />}
            <Button size='large' onClick={handleSubmit} disabled={!currencyInAmount || !lockTime}>
              Unstake
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default UnstakeForm
