import { fractions, spacings } from '@shared/constants'
import styled from 'styled-components'

export interface SplitProps {
  gutter?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  fraction?: '1/4' | '1/3' | '1/2' | '2/3' | '3/4'
}

export const Split = styled.div<SplitProps>`
  display: grid;
  gap: ${props => (props.gutter ? spacings[props.gutter] : spacings.lg)};
  grid-template-columns: ${props =>
    props.fraction ? fractions[props.fraction] : fractions['1/2']};
`

export default Split
