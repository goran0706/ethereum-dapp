import styled from 'styled-components'

import Split from '../split/split'

export interface RowProps {
  align?: 'flex-start' | 'center' | 'flex-end'
  justify?: 'flex-start' | 'center' | 'flex-end'
}

export const Row = styled(Split)<RowProps>`
  align-items: ${props => props.align ?? 'center'};
  justify-content: ${props => props.justify ?? 'center'};
`

export default Row
