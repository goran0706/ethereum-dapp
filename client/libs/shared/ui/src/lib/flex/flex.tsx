import { spacings } from '@shared/constants'
import styled from 'styled-components'

export interface FlexProps {
  flexDirection?: 'row' | 'column'
  alignItems?: string
  justifyContent?: string
  wrap?: string
  gutter?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '2xxl'
}

export const Flex = styled.div<FlexProps>`
  align-items: ${props => props.alignItems || 'stretch'};
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => spacings[props.gutter || 'lg']};
  justify-content: ${props => props.justifyContent || 'stretch'};
`

export default Flex
