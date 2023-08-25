import { CLEAR_ALERT_DELAY, ContractsInfo } from '@shared/constants'
import { useCurrencyForm } from '@shared/hooks'
import { useCurrencySelect } from '@shared/store'
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
import { FormEvent, useEffect } from 'react'
import { formatEther } from 'viem'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useFeeData
} from 'wagmi'

export function UnlockForm() {
  const { currencyIn, setCurrencyIn } = useCurrencySelect()
  const {
    currencyInAmount,
    errorMessage,
    incrementBalance,
    locked,
    handleCurrencyInAmountChange,
    handleLockedPercentageClick,
    handleError,
    handleErrorClear
  } = useCurrencyForm()

  const { isConnected, address: beneficiary } = useAccount()

  const { data: feeData } = useFeeData()
  const networkFee = feeData?.formatted.gasPrice
  const fiatAmount = BigInt(1800) // Todo: fix... fetch and show actual tokenToFiat conversion

  const { data: exitFee } = useContractRead({
    ...ContractsInfo.Locking,
    functionName: 'exitFeePercentage'
  })

  const txDetails = [
    { label: 'Network Fee:', value: `~${networkFee}` },
    { label: 'Exit Fee:', value: `${formatEther(exitFee ?? BigInt(0))}%` }
  ]

  const { writeAsync: unlockTokens, isLoading: isLoadingUnlock } =
    useContractWrite({
      ...ContractsInfo.Locking,
      functionName: 'unlockTokens'
    })

  useEffect(() => {
    const id = setTimeout(handleErrorClear, CLEAR_ALERT_DELAY)
    return () => clearTimeout(id)
  }, [handleErrorClear])

  const handleUnlock = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    if (isConnected && beneficiary) {
      try {
        await unlockTokens({ args: [ContractsInfo.Token.address] })
        incrementBalance(BigInt(currencyInAmount))
      } catch (err) {
        handleError(err)
      }
    }
  }

  return (
    <Panel width='480px' height='fit-content'>
      <Stack>
        <Flex alignItems='center'>
          <AnchorInternal to='/locking/lock'>Lock</AnchorInternal>
          <AnchorInternal to='/locking/unlock'>Unlock</AnchorInternal>
        </Flex>
        <Form>
          <Stack gutter='sm'>
            <CurrencyInputPanel
              currency={currencyIn}
              onCurrencyChange={setCurrencyIn}
              currencyAmount={currencyInAmount}
              onCurrencyAmountChange={handleCurrencyInAmountChange}
              fiatAmount={fiatAmount}
              balanceLabel='Locked'
              balanceAmount={locked}
              renderNativeToken
              renderCurrencyBalance
              renderPercentageButtons
              onPercentageClick={handleLockedPercentageClick}
            />
            {txDetails && <TransactionDetails items={txDetails} />}
            {errorMessage && (
              <TransactionAlert color='red' message={errorMessage} />
            )}
            <Button
              size='large'
              type='submit'
              isLoading={isLoadingUnlock}
              disabled={!isConnected || !beneficiary || !currencyInAmount}
              onClick={handleUnlock}
            >
              Unlock
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default UnlockForm
