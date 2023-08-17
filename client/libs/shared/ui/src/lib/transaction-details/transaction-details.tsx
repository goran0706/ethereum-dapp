import styled from 'styled-components'

import Row from '../row/row'
import Stack from '../stack/stack'
import Text from '../text/text'

const StyledDetails = styled(Stack)`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  // border: 1px solid var(--color-black-300);
  color: var(--color-black-800);
  padding: 1.2rem;
`

export const TransactionDetails = ({ items }: { items: any[] }) => {
  if (!items.length) return null

  return (
    <StyledDetails gutter='sm'>
      {items.map(item => (
        <Row fraction='1/3' key={item.label}>
          <Text fontSize='sm' fontWeight='bold'>
            {item.label}
          </Text>
          <Text fontSize='sm' fontWeight='bold' align='right'>
            {item.value}
          </Text>
        </Row>
      ))}
    </StyledDetails>
  )
}

export default TransactionDetails
