import { Token } from '@shared/models'
import { CurrencySelect, Input, Row, Text, TextButton } from '@shared/ui'
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

export interface LimitPriceProps {
  rate: bigint
  price: string
  currency: Token
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSetToMarketPriceClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCurrencyChange: (value: Token) => void
}

const StyledLimitPrice = styled.div`
  background-color: var(--color-black-200);
  border-radius: var(--border-radius-lg);
  // border: 1px solid var(--color-black-300);
  color: var(--color-black-800);
  padding: 1.2rem;

  select,
  input {
    border: none;
    box-shadow: none;
  }
  select {
    height: fit-content;
  }
  input {
    font-size: 2.4rem;
  }
`

const TargetPriceInputPanel: React.FC<LimitPriceProps> = ({
  rate,
  price,
  currency,
  onPriceChange,
  onCurrencyChange,
  onSetToMarketPriceClick
}) => {
  return (
    <StyledLimitPrice>
      <Row fraction='2/3'>
        <Text fontSize='sm' fontWeight='bold'>
          {`Sell at rate (${rate}%)`}
        </Text>
        <TextButton size='small' onClick={onSetToMarketPriceClick}>
          Set to market
        </TextButton>
      </Row>
      <Row fraction='2/3'>
        <Input
          aria-invalid='false'
          autoComplete='off'
          autoCorrect='off'
          inputMode='decimal'
          maxLength={30}
          minLength={1}
          pattern='^[0-9]*[.,]?[0-9]*$'
          placeholder='0'
          spellCheck='false'
          tabIndex={0}
          type='text'
          value={price}
          onChange={onPriceChange}
        />
        <CurrencySelect
          currency={currency}
          onCurrencySelect={onCurrencyChange}
        />
      </Row>
    </StyledLimitPrice>
  )
}

export default TargetPriceInputPanel
