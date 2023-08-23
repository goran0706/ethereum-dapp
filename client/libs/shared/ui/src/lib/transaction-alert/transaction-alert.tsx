import styled from 'styled-components'

import Stack from '../stack/stack'
import Text from '../text/text'

const StyledAlert = styled(Stack)`
  background-color: var(--color-${props => props.color}-700);
  border-radius: var(--border-radius-lg);
  padding: 1.2rem;
`

export const TransactionAlert = ({
  color,
  message
}: {
  color: string
  message: string
}) => {
  return (
    <StyledAlert color={color}>
      <Text fontSize='lg' color='brand'>
        {message}
      </Text>
    </StyledAlert>
  )
}

export default TransactionAlert
