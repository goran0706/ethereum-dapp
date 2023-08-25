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
import { FormEvent, useEffect } from 'react'
import { parseEther } from 'viem'
import { useAccount, useContractWrite, useFeeData } from 'wagmi'

export function StakeForm() {
  const { currencyIn, setCurrencyIn } = useCurrencySelect()
  const {
    balance,
    currencyInAmount,
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

  const { writeAsync: approve, isLoading: isLoadingApprove } = useContractWrite(
    { ...ContractsInfo.Token, functionName: 'approve' }
  )

  const { writeAsync: stake, isLoading: isLoadingStake } = useContractWrite({
    ...ContractsInfo.Staking,
    functionName: 'stake'
  })

  const { writeAsync: stakeWithPermit, isLoading: isLoadingPermit } =
    useContractWrite({
      ...ContractsInfo.Staking,
      functionName: 'stakeWithPermit'
    })

  useEffect(() => {
    const id = setTimeout(handleErrorClear, CLEAR_ALERT_DELAY)
    return () => clearTimeout(id)
  }, [errorMessage, handleErrorClear])

  const handleStake = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      await approve({ args: [spender, value] })
      await stake({ args: [token, value] })
      decrementBalance(value)
    } catch (err) {
      handleError(err)
    }
  }

  const handleStakeWithPermit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const signature = await generateSignature()
      if (signature) {
        const { v, r, s } = signature
        await stakeWithPermit({
          args: [token, value, deadline, Number(v), r, s]
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
          <Stack gutter='sm'>
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
              isLoading={isLoadingPermit || isLoadingApprove || isLoadingStake}
              disabled={
                !beneficiary ||
                !currencyInAmount ||
                !isConnected ||
                lockTime === null ||
                lockTime === undefined
              }
              onClick={isPermitOn ? handleStakeWithPermit : handleStake}
            >
              {isPermitOn ? 'Permit & Stake' : 'Approve & Stake'}
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default StakeForm
