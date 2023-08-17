import styled, { css } from 'styled-components'

const types = {
  vertical: css`
    width: 1px;
    margin: 0 0.6rem;
  `,
  horizontal: css`
    height: 1px;
    margin: 0.6rem 0;
  `
}

type DividerType = keyof typeof types

export interface DividerProps {
  type: DividerType
}

export const Divider = styled.div<DividerProps>`
  background-color: var(--color-black-300);
  ${props => types[props.type]}
`

export default Divider
