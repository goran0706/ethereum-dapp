import { Token } from '@shared/models'
import { ChangeEvent } from 'react'
import styled from 'styled-components'

import Button from '../button/button'
import CurrencySelect from '../currency-select-box/currency-select-box'
import Flex from '../flex/flex'
import Grid from '../grid/grid'
import Input from '../input/input'
import Row from '../row/row'
import Stack from '../stack/stack'
import Text from '../text/text'

export interface CurrencyInputPanelProps {
  currency: Token
  onCurrencyChange: (token: Token) => void
  currencyAmount: number | string
  onCurrencyAmountChange: (e: ChangeEvent<HTMLInputElement>) => void
  fiatAmount?: number
  balanceAmount?: number
  balanceLabel?: string
  readOnly?: boolean
  renderNativeToken?: boolean
  renderCurrencyBalance?: boolean
  renderCurrencySelector?: boolean
  renderPercentageButtons?: boolean
  onPercentageClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const StyledCurrencyInput = styled(Stack)`
  background-color: var(--color-black-200);
  border-radius: var(--border-radius-lg);
  // border: 1px solid var(--color-black-300);
  color: var(--color-black-800);
  padding: 1.2rem;

  select,
  input {
    border: none;
    box-shadow: none;
    background-color: var(--color-black-200);
  }

  select {
    height: fit-content;
    background-color: var(--color-black-200);
  }

  input {
    font-size: 2.4rem;
  }
`

const TokenWrapper = styled(Flex)`
  align-items: center;
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-200);
  justify-content: flex-start;
  padding: 0.8rem 1.6rem;
  position: relative;
  width: 150px;
`

const TokenIcon = styled.img`
  height: 24px;
  width: 24px;
`

const TokenSymbol = styled(Text)`
  flex-grow: 1;
  font-weight: bold;
`

const FiatAmountText = styled(Text)`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
`

const BalanceAmountText = styled(Text)`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`

const PercentageButton = styled(Button)`
  /* Add your CSS styles for the percentage buttons here */
`

export function CurrencyInputPanel({
  currency,
  onCurrencyChange,
  currencyAmount,
  onCurrencyAmountChange,
  fiatAmount,
  balanceAmount,
  balanceLabel,
  readOnly,
  renderNativeToken,
  renderCurrencyBalance,
  renderCurrencySelector,
  renderPercentageButtons,
  onPercentageClick
}: CurrencyInputPanelProps) {
  return (
    <StyledCurrencyInput>
      <Row fraction='3/4'>
        <Input
          aria-invalid='false'
          autoComplete='off'
          autoCorrect='off'
          inputMode='decimal'
          maxLength={30}
          minLength={1}
          pattern='^[0-9]*[.,]?[0-9]*$'
          placeholder='0'
          readOnly={readOnly}
          spellCheck='false'
          tabIndex={0}
          type='number' // Use type="number" for numeric input
          value={currencyAmount}
          onChange={onCurrencyAmountChange}
        />
        {renderCurrencySelector && (
          <CurrencySelect currency={currency} onCurrencySelect={onCurrencyChange} />
        )}
        {renderNativeToken && (
          <TokenWrapper>
            <TokenIcon src={currency?.logoURI} />
            <TokenSymbol>{currency?.symbol}</TokenSymbol>
          </TokenWrapper>
        )}
      </Row>
      {renderCurrencyBalance && (
        <Row fraction='1/2'>
          <FiatAmountText align='left'>{`~$${fiatAmount}`}</FiatAmountText>
          {balanceAmount !== undefined && balanceLabel && (
            <BalanceAmountText align='right'>{`${balanceLabel}: ${balanceAmount}`}</BalanceAmountText>
          )}
        </Row>
      )}
      {renderPercentageButtons && (
        <Grid>
          {[25, 50, 75, 100].map(percent => (
            <PercentageButton
              key={percent}
              type='button'
              data-percent={percent}
              onClick={onPercentageClick}
            >
              {`${percent}%`}
            </PercentageButton>
          ))}
        </Grid>
      )}
    </StyledCurrencyInput>
  )
}

export default CurrencyInputPanel
