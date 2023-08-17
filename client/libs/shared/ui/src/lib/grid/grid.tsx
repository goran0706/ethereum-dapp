import { spacings } from '@shared/constants'
import styled from 'styled-components'

export interface GridProps {
  gutter?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  $minItemWidth?: string
}

export const Grid = styled.div<GridProps>`
  display: grid;
  gap: ${props => (props.gutter ? spacings[props.gutter] : spacings.lg)};
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(${props => props.$minItemWidth ?? '0px'}, 100%), 1fr)
  );
`

export default Grid
