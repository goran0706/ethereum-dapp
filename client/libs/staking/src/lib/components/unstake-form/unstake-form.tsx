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
import { formatEther, parseEther } from 'viem'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useFeeData
} from 'wagmi'

export function UnstakeForm() {
  const { currencyIn, setCurrencyIn } = useCurrencySelect()
  const {
    currencyInAmount,
    errorMessage,
    incrementBalance,
    staked,
    handleCurrencyInAmountChange,
    handleStakedPercentageClick,
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

  const { writeAsync: unstake, isLoading: isLoadingUnstake } = useContractWrite(
    { ...ContractsInfo.Staking, functionName: 'unstake' }
  )

  useEffect(() => {
    const id = setTimeout(handleErrorClear, CLEAR_ALERT_DELAY)
    return () => clearTimeout(id)
  }, [handleErrorClear])

  const handleUnstake = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    if (isConnected && beneficiary) {
      try {
        await unstake({
          args: [ContractsInfo.Token.address, parseEther(currencyInAmount)]
        })
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
          <AnchorInternal to='/staking/stake'>Stake</AnchorInternal>
          <AnchorInternal to='/staking/unstake'>Unstake</AnchorInternal>
          <AnchorInternal to='/staking/add-stake'>Add Liquidity</AnchorInternal>
          <AnchorInternal to='/staking/remove-unstake'>
            Remove Liquidity
          </AnchorInternal>
        </Flex>
        <Form>
          <Stack gutter='sm'>
            <CurrencyInputPanel
              currency={currencyIn}
              onCurrencyChange={setCurrencyIn}
              currencyAmount={currencyInAmount}
              onCurrencyAmountChange={handleCurrencyInAmountChange}
              fiatAmount={fiatAmount}
              balanceLabel='Staked'
              balanceAmount={staked}
              renderNativeToken
              renderCurrencyBalance
              renderPercentageButtons
              onPercentageClick={handleStakedPercentageClick}
            />
            {txDetails && <TransactionDetails items={txDetails} />}
            {errorMessage && (
              <TransactionAlert color='red' message={errorMessage} />
            )}
            <Button
              size='large'
              type='submit'
              isLoading={isLoadingUnstake}
              disabled={!isConnected || !beneficiary || !currencyInAmount}
              onClick={handleUnstake}
            >
              Unstake
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default UnstakeForm
