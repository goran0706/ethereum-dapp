import { ButtonHTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import LoaderMini from '../loader-mini/loader-mini'

const sizes = {
  small: css`
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
    text-align: center;
    text-transform: uppercase;
  `,
  medium: css`
    font-size: 1.4rem;
    font-weight: 500;
    padding: 0.6rem 1.2rem;
  `,
  large: css`
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
  `
}

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-black-800);
    background: var(--color-black-50);
    // border: 2px solid var(--color-brand-600);

    &:hover {
      background-color: var(--color-black-200);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $block?: boolean
  size?: 'small' | 'medium' | 'large'
  variation?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  children: ReactNode
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  width: ${props => (props.$block ? '100%' : 'auto')};
  ${({ size }) => sizes[size || 'medium']}
  ${({ variation }) => variations[variation || 'primary']}
`

export const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  if (!children) return null

  return (
    <StyledButton {...props}>
      {isLoading ? <LoaderMini /> : children}
    </StyledButton>
  )
}

export default Button
