import { ReactNode } from 'react'
import styled from 'styled-components'

import Stack from '../stack/stack'

export interface ChecklistProps<T> {
  items: T[]
  render: (item: T) => ReactNode
}

const StyledChecklist = styled(Stack).attrs({ as: 'ul' })`
  border-radius: var(--border-radius-lg);
  padding: 0.4rem;
  height: 100%;
  width: 100%;
`

export function Checklist<T>({ items, render }: ChecklistProps<T>) {
  return <StyledChecklist gutter='xl'>{items.map(item => render(item))}</StyledChecklist>
}

export default Checklist
