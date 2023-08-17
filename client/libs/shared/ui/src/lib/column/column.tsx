import styled from 'styled-components'

export interface ColumnProps {
  align?: string
  justify?: string
  $span?: string | number
}

export const Column = styled.div<ColumnProps>`
  align-items: ${props => props.align ?? 'center'};
  grid-column: span minmax(${props => props.$span ?? '1'}, 1fr);
  justify-content: ${props => props.justify ?? 'center'};
`

export default Column
