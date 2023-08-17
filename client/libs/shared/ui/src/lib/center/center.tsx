import styled, { css } from 'styled-components'

export interface CenterProps {
  $maxWidth?: string
  $centerText?: boolean
  $centerChildren?: boolean
}

export const Center = styled.div<CenterProps>`
  margin-inline-start: auto;
  margin-inline-end: auto;
  max-inline-size: ${props => props.$maxWidth};

  /* Center Text */
  ${props =>
    props.$centerText &&
    css`
      text-align: center;
    `}

  /* Center Children */
  ${props =>
    props.$centerChildren &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`

export default Center
