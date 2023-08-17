import { spacings } from '@shared/constants'
import styled from 'styled-components'

export interface FlexProps {
  direction?: 'row' | 'column'
  align?: string
  justify?: string
  wrap?: string
  gutter?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

export const Flex = styled.div<FlexProps>`
  align-items: ${props => props.align || 'stretch'};
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => spacings[props.gutter || 'lg']};
  justify-content: ${props => props.justify || 'stretch'};
`

export default Flex
