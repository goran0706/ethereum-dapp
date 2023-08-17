import styled from 'styled-components'

import Center from '../center/center'
import Stack from '../stack/stack'

// Card Component
export const Card = styled(Stack)`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-50);
  box-shadow: var(--shadow);
  padding: 1.6rem;
  overflow: hidden;

  /* This sets the gap property between children */
  gap: 1.6rem;

  /* These properties align children in a column layout */
  grid-template-rows: auto 1fr auto;
  align-content: start;
  align-items: start;
  justify-content: start;
  justify-items: start;
`

// Card Header Component
export const CardHeader = styled(Center)`
  padding: 1.6rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 2px solid ${props => props.color ?? 'var(--color-blue-100)'};
  width: 100%;
  svg {
    fill: ${props => props.color};
  }
`

// Card Body Component
export const CardBody = styled(Stack)`
  padding: 1.6rem;
  gap: 0; /* Reset gap to allow direct control of spacing */
  h3 {
    margin-top: 0;
  }
`

// Card Footer Component
export const CardFooter = styled(Center)`
  padding: 1.6rem;
  width: 100%;
`

export default Card
