import { MdSwapVert } from 'react-icons/md'
import styled from 'styled-components'

import Center from '../center/center'
import IconButton from '../icon-button/icon-button'

export interface CurrencySwapButtonProps {
  onClick: () => void
}

const StyledCurrencySwapButton = styled(Center)`
  margin: -16px 0 -20px; /* Adjust margin values */
  height: fit-content;
  z-index: 1;

  button {
    background-color: var(--color-black-50);
    padding: 2px;

    :hover {
      background-color: var(--color-black-200);
    }
  }
`

export function CurrencySwapButton({ onClick }: CurrencySwapButtonProps) {
  return (
    <StyledCurrencySwapButton $centerText $centerChildren>
      <IconButton onClick={onClick}>
        <MdSwapVert />
      </IconButton>
    </StyledCurrencySwapButton>
  )
}

export default CurrencySwapButton
