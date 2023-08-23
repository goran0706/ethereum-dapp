import { Button, Form, FormRow, Input, Panel, Stack } from '@shared/ui'
import { ChangeEvent, FormEvent, useState } from 'react'

export function Calculator() {
  const [tokenAmount, setTokenAmount] = useState('')
  const [yieldPercentage, setYieldPercentage] = useState('')
  const [calculatedYield, setCalculatedYield] = useState('')

  const handleTokenAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTokenAmount(value)
  }

  const handleYieldPercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setYieldPercentage(value)
  }

  const calculateYield = (e: FormEvent) => {
    e.preventDefault()
    const yieldAmount =
      (parseFloat(tokenAmount) * parseFloat(yieldPercentage)) / 100
    setCalculatedYield(yieldAmount.toFixed(2))
  }

  return (
    <Panel width='480px' height='fit-content'>
      <Form>
        <Stack>
          <FormRow label='Token Amount:'>
            <Input
              autoComplete='off'
              inputMode='decimal'
              maxLength={30}
              type='number'
              dir='rtl'
              value={tokenAmount}
              onChange={handleTokenAmountChange}
            />
          </FormRow>
          <FormRow label='Yield Percentage:'>
            <Input
              autoComplete='off'
              inputMode='decimal'
              maxLength={30}
              type='number'
              dir='rtl'
              value={yieldPercentage}
              onChange={handleYieldPercentageChange}
            />
          </FormRow>
          <FormRow label='Calculated Yield:'>
            <Input
              autoComplete='off'
              dir='rtl'
              inputMode='decimal'
              maxLength={30}
              readOnly
              type='number'
              value={calculatedYield}
            />
          </FormRow>
          <Button size='large' onClick={calculateYield}>
            Calculate Yield
          </Button>
        </Stack>
      </Form>
    </Panel>
  )
}
