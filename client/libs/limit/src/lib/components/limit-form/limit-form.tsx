import { CLEAR_ALERT_DELAY } from '@shared/constants'
import { useCurrencyForm } from '@shared/hooks'
import { useCurrencySelect } from '@shared/store'
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
import { useEffect } from 'react'
import { useAccount, useFeeData } from 'wagmi'

import TargetPriceInputPanel from '../target-price-input-panel/target-price-input-panel'

const LimitOrderForm: React.FC = () => {
  const { currencyIn, setCurrencyIn, currencyOut, setCurrencyOut } =
    useCurrencySelect()
  const {
    balance,
    currencyInAmount,
    currencyOutAmount,
    errorMessage,
    isPermitOn,
    limitPrice,
    lockTime,
    handleBalancePercentageClick,
    handleCurrencyInAmountChange,
    handleCurrencyOutAmountChange,
    handleCurrencySwap,
    handleErrorClear,
    handleLimitPriceChange,
    handleSetToMarketPriceClick
  } = useCurrencyForm()

  const { isConnected, address: beneficiary } = useAccount()

  const { data: feeData } = useFeeData()
  const networkFee = feeData?.formatted.gasPrice
  const fiatAmount = BigInt(1800) // Todo: fix... fetch and show actual tokenToFiat conversion
  const rate = BigInt(1.8)

  const txDetails = [{ label: 'Network Fee:', value: `~${networkFee}` }]

  useEffect(() => {
    const id = setTimeout(handleErrorClear, CLEAR_ALERT_DELAY)
    return () => clearTimeout(id)
  }, [errorMessage, handleErrorClear])

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
                balanceLabel='Balance'
                balanceAmount={balance}
                renderNativeToken
                renderCurrencyBalance
                renderCurrencySelector
                renderPercentageButtons
                onPercentageClick={handleBalancePercentageClick}
              />
              <CurrencySwapButton onClick={handleCurrencySwap} />
              <CurrencyInputPanel
                currency={currencyOut}
                onCurrencyChange={setCurrencyOut}
                currencyAmount={currencyOutAmount}
                onCurrencyAmountChange={handleCurrencyOutAmountChange}
                fiatAmount={fiatAmount}
                balanceLabel='Balance'
                balanceAmount={balance}
                renderNativeToken
                renderCurrencyBalance
                renderCurrencySelector
              />
              <TargetPriceInputPanel
                price={limitPrice}
                onPriceChange={handleLimitPriceChange}
                onSetToMarketPriceClick={handleSetToMarketPriceClick}
                currencySymbol={currencyIn.symbol}
                rate={rate}
              />
            </Stack>
            {txDetails && <TransactionDetails items={txDetails} />}
            {errorMessage && (
              <TransactionAlert color='red' message={errorMessage} />
            )}
            <Button
              size='large'
              type='submit'
              isLoading={false}
              disabled={
                !beneficiary ||
                !currencyInAmount ||
                !isConnected ||
                lockTime === null ||
                lockTime === undefined
              }
              onClick={() => alert('TEST')}
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
