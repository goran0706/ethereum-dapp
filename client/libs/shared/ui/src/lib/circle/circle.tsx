import styled from 'styled-components'

export interface CircleProps {
  size: string
}

export const Circle = styled.div<CircleProps>`
  align-content: center;
  background-color: var(--color-black-200);
  border-radius: 50%;
  box-sizing: content-box;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-wrap: wrap;
  font-size: 1.4rem;
  justify-content: center;
  line-height: 1; /* Use 1 to prevent any additional space between lines */
  width: ${({ size }) => size ?? '2.4rem'};
  height: ${({ size }) => size ?? '2.4rem'};
`

export default Circle
