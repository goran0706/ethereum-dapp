import styled from 'styled-components'

import Stack from '../stack/stack'

export interface ContainerProps {
  $maxWidth?: string
}

export const Container = styled(Stack)<ContainerProps>`
  margin: 0 auto;
  max-width: ${props => props.$maxWidth};
  padding: 0 1rem 3rem; /* Use responsive padding units, if desired */
  width: 100%;
`

export default Container
