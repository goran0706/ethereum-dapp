import styled from 'styled-components'

export const IconButton = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  border-radius: var(--border-radius-lg);
  padding: 0.6rem;

  &:hover {
    background-color: var(--color-black-200);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-600);
  }
`

export default IconButton
