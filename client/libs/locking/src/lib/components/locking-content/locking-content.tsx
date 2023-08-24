import { Checklist, Circle, Flex, Heading, Stack, Text } from '@shared/ui'

interface ChecklistItem {
  id: number
  title: string
  description: string
}

const items = [
  {
    id: 1,
    title: 'HODL with Confidence:',
    description:
      'Locking your tokens demonstrates your commitment to the project and your belief in its potential, encouraging a strong community of like-minded supporters.'
  },
  {
    id: 2,
    title: 'Reduce Short-term Volatility Impact:',
    description:
      'Volatile market conditions can lead to impulsive decisions. By locking your tokens, you can avoid making emotional choices during price fluctuations.'
  },
  {
    id: 3,
    title: 'Participate in Exclusive Events:',
    description:
      "Many projects offer exciting incentives, airdrops, or exclusive events for locked token holders. Don't miss out on these valuable opportunities!"
  }
]

const steps = [
  {
    id: 1,
    title: 'Connect Your Wallet:',
    description:
      'Ensure you are using a compatible wallet (e.g., MetaMask) and connect it to the DApp platform.'
  },
  {
    id: 2,
    title: 'Select Token Amount:',
    description:
      'Choose the amount of tokens you wish to lock and review the associated locking period options.'
  },
  {
    id: 3,
    title: 'Confirm & Sign:',
    description:
      "Once you've made your selection, confirm the transaction through your wallet and sign the lock contract."
  },
  {
    id: 4,
    title: 'Track Your Locked Tokens:',
    description:
      "You can easily track your locked tokens' status through our user-friendly interface, keeping you informed every step of the way."
  }
]

// Render checklist items
function renderChecklistItem(item: ChecklistItem) {
  return (
    <Flex as='li' key={item.id}>
      <Circle size='3.2rem'>{item.id}</Circle>
      <Flex flexDirection='column' gutter='sm'>
        <Text fontSize='lg' fontWeight='bold'>
          {item.title}
        </Text>
        <Text fontSize='lg' color='dark'>
          {item.description}
        </Text>
      </Flex>
    </Flex>
  )
}

export function LockingContent() {
  return (
    <Stack gutter='xxl'>
      <Heading as='h1'>Welcome to our DApp Token Locking Page!</Heading>

      {/* Secure Your Tokens */}
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Secure Your Tokens'>
            🔒
          </span>{' '}
          Secure Your Tokens:
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          At [DApp Name], we prioritize the security of your tokens. With our
          token locking feature, you can rest assured that your valuable assets
          are safe from potential risks and market fluctuations. Token locking
          adds an extra layer of protection to your investment, giving you peace
          of mind and confidence in the long-term success of your holdings.
        </Text>
      </Stack>

      {/* Why Lock Your Tokens */}
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Why Lock Your Tokens'>
            💼
          </span>{' '}
          Why Lock Your Tokens?
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          Token locking is a smart move for every serious investor. By locking
          your tokens, you are committing to a specific time frame during which
          your tokens cannot be traded or transferred.
        </Text>
        <Checklist items={items} render={renderChecklistItem} />
      </Stack>

      {/* Locking Periods */}
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Locking Periods'>
            📆
          </span>{' '}
          Locking Periods:
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          At [DApp Name], we offer various token locking options to suit your
          individual needs. Choose from flexible locking periods ranging from
          short-term to long-term, ensuring you have the right level of
          commitment that aligns with your investment strategy.
        </Text>
      </Stack>

      {/* How to Lock Your Tokens */}
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='How to Lock Your Tokens'>
            🚀
          </span>{' '}
          How to Lock Your Tokens:
        </Heading>
        <Checklist items={steps} render={renderChecklistItem} />
      </Stack>

      {/* Unlocking Your Tokens */}
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Unlocking Your Tokens'>
            🔓
          </span>{' '}
          Unlocking Your Tokens:
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          Should you need access to your tokens before the lock-up period ends,
          don't worry! Our platform offers flexible unlocking options, allowing
          you to access your tokens when necessary, subject to any applicable
          restrictions.
        </Text>
      </Stack>

      {/* Join the Locking Movement */}
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Join the Locking Movement'>
            🌟
          </span>{' '}
          Join the Locking Movement:
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          Become part of the growing community of dedicated and committed token
          holders at [DApp Name]. Lock your tokens today and help us build a
          strong foundation for a better decentralized future!
        </Text>
      </Stack>

      {/* Support and Disclaimer */}
      <Stack>
        <Text fontSize='lg' color='dark' align='justify'>
          <span role='img' aria-label='Disclaimer'>
            📧
          </span>{' '}
          For any questions or assistance regarding token locking, feel free to
          reach out to our friendly support team at [Contact Email or Support
          Chat Link]. We are here to help you every step of the way!
        </Text>
        <Text fontSize='lg' color='dark' align='justify'>
          <strong>
            <span role='img' aria-label='Disclaimer'>
              📜
            </span>{' '}
            Disclaimer:
          </strong>{' '}
          Token locking involves risks, and we advise users to conduct thorough
          research and seek professional advice before making any investment
          decisions.
        </Text>
      </Stack>
    </Stack>
  )
}

export default LockingContent
