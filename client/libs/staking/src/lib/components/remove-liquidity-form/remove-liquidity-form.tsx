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
import { useEffect } from 'react'
import { formatEther, parseEther } from 'viem'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useFeeData
} from 'wagmi'

export function RemoveAndUnstake() {
  const { currencyIn, setCurrencyIn } = useCurrencySelect()
  const {
    currencyInAmount,
    errorMessage,
    incrementBalance,
    locked,
    handleCurrencyInAmountChange,
    handleLockedPercentageClick,
    handleError,
    handleErrorClear,
    handleSubmit
  } = useCurrencyForm()

  const { isConnected, address: beneficiary } = useAccount()
  const { data: feeData } = useFeeData()
  const networkFee = feeData?.formatted.gasPrice
  const fiatAmount = BigInt(1800) // Todo: fix... fetch and show actual tokenToFiat conversion

  const { data: exitFee } = useContractRead({
    ...ContractsInfo.Staking,
    functionName: 'exitFeePercentage'
  })

  const txDetails = [
    { label: 'Network Fee:', value: `~${networkFee}` },
    { label: 'Exit Fee:', value: `${formatEther(exitFee ?? BigInt(0))}%` }
  ]

  const {
    writeAsync: removeLiquidityAndUnstake,
    isLoading: isLoadingRemoveLiquidity
  } = useContractWrite({
    ...ContractsInfo.Staking,
    functionName: 'removeLiquidityAndUnstake'
  })

  useEffect(() => {
    const id = setTimeout(handleErrorClear, CLEAR_ALERT_DELAY)
    return () => clearTimeout(id)
  }, [handleErrorClear])

  const handleRemoveLiquidityAndUnstake = async (): Promise<void> => {
    if (isConnected && beneficiary) {
      try {
        // Todo: LP token address, minAmountA, minAmountB
        const minA = parseEther(currencyInAmount) / BigInt(2)
        const minB = minA
        await removeLiquidityAndUnstake({
          args: [
            ContractsInfo.Token.address,
            parseEther(currencyInAmount),
            minA,
            minB
          ]
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
        <Form onSubmit={e => handleSubmit(e, handleRemoveLiquidityAndUnstake)}>
          <Stack>
            <CurrencyInputPanel
              currency={currencyIn}
              onCurrencyChange={setCurrencyIn}
              currencyAmount={currencyInAmount}
              onCurrencyAmountChange={handleCurrencyInAmountChange}
              fiatAmount={fiatAmount}
              balanceLabel='Staked'
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
              isLoading={isLoadingRemoveLiquidity}
              disabled={!isConnected || !beneficiary || !currencyInAmount}
              onClick={handleRemoveLiquidityAndUnstake}
            >
              Remove Liquidity & Unstake
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default RemoveAndUnstake
