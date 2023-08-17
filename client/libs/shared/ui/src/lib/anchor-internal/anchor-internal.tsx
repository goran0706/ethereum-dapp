import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const AnchorInternal = styled(NavLink)`
  display: inline-block;
  background-color: var(--color-black-50);
  color: var(--color-black-600);
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--color-black-50);
  border-radius: var(--border-radius-md);

  &:hover,
  &:active,
  &.active {
    background-color: var(--color-black-200);
    color: var(--color-black-800);
    border-color: var(--color-black-200);
  }
`

export default AnchorInternal
