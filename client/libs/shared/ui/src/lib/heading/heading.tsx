import styled, { css } from 'styled-components'

export const headings = {
  h1: css`
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1;
  `,
  h2: css`
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.75rem;
  `,
  h3: css`
    font-size: 1.8rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.75rem;
  `,
  h4: css`
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.75rem;
  `,
  h5: css`
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.75rem;
  `
}

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  color?: string
}

export const Heading = styled.h1<HeadingProps>`
  color: var(--color-${props => props.color}-700);
  font-weight: bold;
  line-height: 1.3;
  margin: 0 0 1.6rem;

  font-size: ${props => (props.as ? headings[props.as] : headings.h1)};
  ${props => props.as === 'h1' && 'margin-top: 0'};
`

export default Heading
