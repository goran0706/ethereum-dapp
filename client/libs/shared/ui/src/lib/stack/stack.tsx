import { spacings } from '@shared/constants'
import styled from 'styled-components'

export interface StackProps {
  gutter?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  align?: string
  justify?: string
}

export const Stack = styled.div<StackProps>`
  display: grid;
  gap: ${props => (props.gutter ? spacings[props.gutter] : spacings.lg)};
  align-content: ${props => (props.align ? props.align : 'stretch')};
  justify-content: ${props => (props.justify ? props.justify : 'stretch')};
`

export default Stack
