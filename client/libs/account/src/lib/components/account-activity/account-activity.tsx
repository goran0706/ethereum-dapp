import { Heading, Stack, Table, Tag, Text, TextButton } from '@shared/ui'

import { activity } from '../../data'

export const AccountActivity = () => {
  return (
    <Stack>
      <Heading as='h3'>Activity</Heading>
      <Table columns='310px 200px 200px 200px 300px 1fr'>
        <Table.Header key='header'>
          <Text>Address</Text>
          <Text>Amount In</Text>
          <Text>Amount Out</Text>
          <Text>Network</Text>
          <Text>Transaction</Text>
        </Table.Header>
        {activity.map(item => (
          <Table.Row key={item.id}>
            <Text>{`${item.address}`}</Text>
            <Tag type='green'>{`${item.currencyInAmount} ${item.currencyIn}`}</Tag>
            <Tag type='red'>{`${item.currencyOutAmount} ${item.currencyOut}`}</Tag>
            <Text>{item.networkName}</Text>
            <Text>{item.transactionHash}</Text>
            <TextButton>Details</TextButton>
          </Table.Row>
        ))}
      </Table>
    </Stack>
  )
}

export default AccountActivity
