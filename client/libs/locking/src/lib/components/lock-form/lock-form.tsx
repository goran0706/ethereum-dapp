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
  PeriodSelect,
  PermitSwitch,
  Stack,
  TransactionAlert,
  TransactionDetails
} from '@shared/ui'
import { FormEvent, useEffect } from 'react'
import { parseEther } from 'viem'
import { useAccount, useContractWrite, useFeeData } from 'wagmi'

export function LockForm() {
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
    handleLockTimeChange,
    handleResetLockTime,
    handleError,
    handleErrorClear
  } = useCurrencyForm()

  const { isConnected, address: beneficiary } = useAccount()
  const token = ContractsInfo.Token.address
  const spender = ContractsInfo.Locking.address
  const value = parseEther(currencyInAmount) // WEI
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

  const { writeAsync: lockTokens, isLoading: isLoadingLock } = useContractWrite(
    { ...ContractsInfo.Locking, functionName: 'lockTokens' }
  )

  const { writeAsync: lockTokensWithPermit, isLoading: isLoadingPermit } =
    useContractWrite({
      ...ContractsInfo.Locking,
      functionName: 'lockTokensWithPermit'
    })

  useEffect(() => {
    const id = setTimeout(handleErrorClear, CLEAR_ALERT_DELAY)
    return () => clearTimeout(id)
  }, [errorMessage, handleErrorClear])

  const handleLockTokens = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      if (isConnected && beneficiary) {
        await approve({ args: [spender, value] })
        await lockTokens({ args: [token, beneficiary, value, lockTime] })
        decrementBalance(value)
      }
    } catch (err) {
      handleError(err)
    }
  }

  const handleLockTokensWithPermit = async (e: FormEvent) => {
    e.preventDefault()
    if (isConnected && beneficiary) {
      try {
        const signature = await generateSignature()
        if (signature) {
          const { v, r, s } = signature
          await lockTokensWithPermit({
            args: [
              token,
              beneficiary,
              value,
              lockTime,
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
              balanceLabel='Balance'
              balanceAmount={balance}
              renderNativeToken
              renderCurrencyBalance
              renderPercentageButtons
              onPercentageClick={handleBalancePercentageClick}
            />
            <PeriodSelect
              value={lockTime}
              onChange={handleLockTimeChange}
              onReset={handleResetLockTime}
            />
            <PermitSwitch isOn={isPermitOn} onToggle={handleTogglePermit} />
            {txDetails && <TransactionDetails items={txDetails} />}
            {errorMessage && (
              <TransactionAlert color='red' message={errorMessage} />
            )}
            <Button
              size='large'
              type='submit'
              isLoading={isLoadingPermit || isLoadingApprove || isLoadingLock}
              disabled={
                !beneficiary ||
                !currencyInAmount ||
                !isConnected ||
                lockTime === null ||
                lockTime === undefined
              }
              onClick={
                isPermitOn ? handleLockTokensWithPermit : handleLockTokens
              }
            >
              {isPermitOn ? 'Permit & Lock' : 'Approve & Lock'}
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Panel>
  )
}

export default LockForm
