import { spacings } from '@shared/constants'
import styled from 'styled-components'

export interface ColumnsProps {
  columns?: string
  gutter?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

export const Columns = styled.div<ColumnsProps>`
  --columns: ${props => props.columns};
  display: grid;
  gap: ${props => (props.gutter ? spacings[props.gutter] : spacings.lg)};
  grid-template-columns: repeat(var(--columns), 1fr);
`

export default Columns
