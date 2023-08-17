import styled, { css } from 'styled-components'

export interface ButtonTextProps {
  size?: 'small' | 'medium' | 'large'
  variation?: 'primary' | 'secondary' | 'danger'
}

const sizes = {
  small: css`
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
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
    color: var(--color-brand-700);

    &:hover,
    &:active {
      background-color: var(--color-black-50);
    }
  `,
  secondary: css`
    color: var(--color-brand-700);
    border: 1px solid var(--color-brand-700);

    &:hover,
    &:active {
      background-color: var(--color-black-50);
    }
  `,
  danger: css`
    color: var(--color-red-700);

    &:hover,
    &:active {
      background-color: var(--color-red-100);
    }
  `
}

export const TextButton = styled.button.attrs({ type: 'button' })<ButtonTextProps>`
  background: none;
  border-radius: var(--border-radius-lg);
  border: none;
  text-align: center;
  ${props => (props.size ? sizes[props.size] : sizes.medium)}
  ${props => (props.variation ? variations[props.variation] : variations.primary)}
`

export default TextButton
