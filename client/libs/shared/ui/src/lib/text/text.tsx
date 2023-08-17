import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

export interface TextProps {
  align?: string
  color?: 'brand' | 'black' | 'blue' | 'red' | 'dark'
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '2xxl'
  fontWeight?: 'light' | 'normal' | 'medium' | 'bold' | 'bolder' | 'bolder'
  children?: string | undefined | ReactNode
}

const colors = {
  brand: css`
    color: var(--color-brand-50);
  `,
  black: css`
    color: var(--color-black-800);
  `,
  blue: css`
    color: var(--color-blue-700);
  `,
  red: css`
    color: var(--color-red-700);
  `,
  dark: css`
    color: var(--color-black-600);
  `
}

const fontSizes = {
  xs: css`
    font-size: 1rem;
  `,
  sm: css`
    font-size: 1.2rem;
  `,
  md: css`
    font-size: 1.4rem;
  `,
  lg: css`
    font-size: 1.6rem;
  `,
  xl: css`
    font-size: 1.8rem;
  `,
  xxl: css`
    font-size: 2rem;
  `,
  '2xxl': css`
    font-size: 3.2rem;
  `
}

const fontWeights = {
  light: css`
    font-weight: 300;
  `,
  normal: css`
    font-weight: 400;
  `,
  medium: css`
    font-weight: 500;
  `,
  bold: css`
    font-weight: 600;
  `,
  bolder: css`
    font-weight: 700;
  `
}

export const Text = styled.p<TextProps>`
  text-align: ${props => (props.align ? props.align : 'left')};
  ${props => (props.color ? colors[props.color] : colors.black)};
  ${props => (props.fontSize ? fontSizes[props.fontSize] : fontSizes.md)};
  ${props => (props.fontWeight ? fontWeights[props.fontWeight] : fontWeights.normal)};
`

export default Text
