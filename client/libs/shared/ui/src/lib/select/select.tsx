import { ReactNode, createContext, useContext } from 'react'
import styled from 'styled-components'

export interface SelectProps {
  value: string | number | readonly string[] | undefined
  children: ReactNode
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface OptionProps {
  value: string | number
  children: ReactNode
}

type StyledSelectType = string | number | readonly string[] | undefined

// Share the value props through the context
const SelectContext = createContext<StyledSelectType | null>(null)

const StyledSelect = styled.select`
  background-color: var(--color-black-0);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-300);
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
`

export const Select = ({ value, onChange, children, ...props }: SelectProps) => {
  return (
    <SelectContext.Provider value={value}>
      <StyledSelect value={value} onChange={onChange} {...props}>
        {children}
      </StyledSelect>
    </SelectContext.Provider>
  )
}

export const Option = ({ value, children, ...props }: OptionProps) => {
  const selectedValue = useContext(SelectContext)
  return (
    <option value={value} selected={value === selectedValue} {...props}>
      {children}
    </option>
  )
}
