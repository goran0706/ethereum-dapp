import styled from 'styled-components'

export const Input = styled.input`
  background-color: var(--color-black-200);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-300);
  box-shadow: var(--shadow-sm);
  padding: 0.6rem 1.2rem;
  width: 100%;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default Input
