import { CLEAR_ALERT_DELAY, ContractsInfo } from '@shared/constants'
import { useCurrencyForm, usePermitSignature } from '@shared/hooks'
import { useCurrencySelect } from '@shared/store'
import {
  AnchorInternal,
  Button,
  CurrencyInputPanel,
  Flex,
  Form,
  Panel,
  PermitSwitch,
  Stack,
  TransactionAlert,
  TransactionDetails
} from '@shared/ui'
import { useEffect } from 'react'
import { parseEther } from 'viem'
import { useAccount, useContractWrite, useFeeData } from 'wagmi'

export function AddAndStakeForm() {
  const { currencyIn, setCurrencyIn, currencyOut } = useCurrencySelect()
  const {
    balance,
    currencyInAmount,
    currencyOutAmount,
    decrementBalance,
    errorMessage,
    isPermitOn,
    lockTime,
    handleCurrencyInAmountChange,
    handleBalancePercentageClick,
    handleTogglePermit,
    handleError,
    handleErrorClear
  } = useCurrencyForm()

  const { isConnected, address: beneficiary } = useAccount()
  const token = ContractsInfo.Token.address
  const spender = ContractsInfo.Staking.address
  const value = parseEther(currencyInAmount.toString())
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600)
  const { generateSignature } = usePermitSignature(
    token,
    spender,
    value,
    deadline
  )

  const { data: feeData } = useFeeData()
  const networkFee = feeData?.formatted.gasPrice
  const fiatAmount = BigInt(1800) // Todo: fix... fetch and show actual tokenToFiat conversion

  const txDetails = [{ label: 'Network Fee:', value: `~${networkFee}` }]

  const {
    writeAsync: addLiquidityAndStakeWithPermit,
    isLoading: isLoadingPermit
  } = useContractWrite({
    ...ContractsInfo.Staking,
    functionName: 'addLiquidityAndStakeWithPermit'
  })

  useEffect(() => {
    const id = setTimeout(handleErrorClear, CLEAR_ALERT_DELAY)
    return () => clearTimeout(id)
  }, [errorMessage, handleErrorClear])

  const handleAddLiquidityAndStakeWithPermit = async () => {
    try {
      const signature = await generateSignature()
      if (signature) {
        const { v, r, s } = signature
        await addLiquidityAndStakeWithPermit({
          args: [
            currencyIn.address,
            currencyOut.address,
            BigInt(currencyInAmount),
            BigInt(currencyOutAmount),
            deadline,
            Number(v),
            r,
            s
          ]
        })
        decrementBalance(value)
      }
    } catch (err) {
      handleError(err)
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
          <Stack>
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
              renderPercentageButtons
              onPercentageClick={handleBalancePercentageClick}
            />
            {txDetails && <TransactionDetails items={txDetails} />}
            {errorMessage && (
              <TransactionAlert color='red' message={errorMessage} />
            )}
            <PermitSwitch isOn={isPermitOn} onToggle={handleTogglePermit} />
            <Button
              size='large'
              type='submit'
              isLoading={isLoadingPermit}
              disabled={
                !beneficiary ||
                !currencyInAmount ||
                !isConnected ||
                lockTime === null ||
                lockTime === undefined
              }
              onClick={
                isPermitOn
                  ? handleAddLiquidityAndStakeWithPermit
                  : handleAddLiquidityAndStakeWithPermit
              }
            >
              {isPermitOn
                ? 'Add Liquidity with Permit & Stake'
                : 'Add Liquidity & Stake'}
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default AddAndStakeForm
