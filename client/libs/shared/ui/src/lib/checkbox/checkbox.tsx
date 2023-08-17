import { ReactNode } from 'react'
import styled from 'styled-components'

export interface CheckboxProps {
  checked: boolean
  disabled: boolean
  id: string
  children: ReactNode
  onChange: () => void
}

const StyledCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  cursor: pointer;

  & input[type='checkbox'] {
    width: 2.4rem;
    height: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
    cursor: not-allowed;
  }
`

export function Checkbox({ checked, onChange, disabled = false, id, children }: CheckboxProps) {
  return (
    <StyledCheckbox>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-disabled={disabled}
      />
      <span>{children}</span>
    </StyledCheckbox>
  )
}

export default Checkbox
