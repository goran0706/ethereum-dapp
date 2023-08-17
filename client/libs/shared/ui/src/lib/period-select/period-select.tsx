import { ChangeEvent } from 'react'
import { RxReset } from 'react-icons/rx'
import styled from 'styled-components'

import Flex from '../flex/flex'
import IconButton from '../icon-button/icon-button'
import Input from '../input/input'
import Row from '../row/row'
import Stack from '../stack/stack'
import Text from '../text/text'

const StyledPeriods = styled(Stack)`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  color: var(--color-black-800);
  padding: 1.2rem;
`

const PeriodLabel = styled.label`
  background-color: var(--color-black-200);
  border-radius: var(--border-radius-lg);
  border: none;
  color: var(--color-brand-600);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
  }

  &:has(input:checked) {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
  }
`

export interface PeriodSelectProps {
  value: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
}

export enum Periods {
  '1M' = 1,
  '3M' = 3,
  '6M' = 6,
  '1Y' = 12,
  '2Y' = 24
}

export const PeriodSelect: React.FC<PeriodSelectProps> = ({ value, onChange, onReset }) => {
  const periodsToRender = Object.entries(Periods).slice(0, 5)

  return (
    <StyledPeriods>
      <Row>
        <Text>Lock Time</Text>
        <Text align='right' fontSize='lg' fontWeight='bold'>
          {Periods[value]}
        </Text>
      </Row>
      <Flex justify='space-between'>
        <IconButton onClick={onReset}>
          <RxReset />
        </IconButton>
        <Flex>
          {periodsToRender.map(period => (
            <PeriodLabel key={period[1]}>
              <Input
                hidden
                type='radio'
                name='period'
                checked={value === Number(period[0])}
                value={period[0]}
                onChange={onChange}
              />
              {period[1]}
            </PeriodLabel>
          ))}
        </Flex>
      </Flex>
    </StyledPeriods>
  )
}

export default PeriodSelect
