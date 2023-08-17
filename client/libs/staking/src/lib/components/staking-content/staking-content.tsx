import { Checklist, Circle, Flex, Heading, Stack, Text } from '@shared/ui'

const reasons = [
  {
    id: 1,
    title: 'Earn Passive Income:',
    description:
      "Staking your DApp tokens allows you to earn passive income in the form of rewards. As you stake your tokens and contribute to the network's operations, you'll receive regular payouts, enhancing the value of your holdings over time."
  },
  {
    id: 2,
    title: 'Support Network Security:',
    description:
      "Staking can have a positive impact on the token's market value. As more users stake their tokens, the circulating supply decreases, potentially leading to scarcity and driving the token's price upwards."
  },
  {
    id: 3,
    title: 'Token Price Appreciation:',
    description:
      "Many projects offer exciting incentives, airdrops, or exclusive events for locked token holders. Don't miss out on these valuable opportunities!"
  },
  {
    id: 4,
    title: 'Participate in Governance:',
    description:
      "Staking often grants you voting rights within the network's governance system. Have your say in important decisions, such as protocol upgrades, fee structures, and new feature implementations."
  },
  {
    id: 5,
    title: 'Alignment of Incentives:',
    description:
      "Staking aligns your interests with the long-term success of the blockchain. As a staker, you share in the network's growth and success, incentivizing you to contribute to its development and improvement actively."
  }
]

const steps = [
  {
    id: 1,
    title: 'Choose a Staking Provider:',
    description:
      "Select a trusted staking provider to delegate your tokens. We've partnered with reliable validators to ensure the safety and integrity of your staked assets."
  },
  {
    id: 2,
    title: 'Stake Your Tokens:',
    description:
      'Send your DApp tokens to the staking contract of your chosen provider. Your tokens remain in your control, and you can unstake them at any time if you wish.'
  },
  {
    id: 3,
    title: 'Earn Rewards:',
    description:
      "As you contribute to the network, you'll start earning rewards. The more tokens you stake and the longer you participate, the higher your rewards will be."
  },
  {
    id: 4,
    title: 'Compound Your Earnings:',
    description:
      'Want to maximize your earnings? Reinvest your staking rewards to compound your returns, further boosting your passive income over time.'
  }
]

function StakingContent() {
  return (
    <Stack gutter='xxl'>
      <Heading as='h1'>Welcome to our DApp Token Staking Page!</Heading>
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Rocket'>
            🚀
          </span>{' '}
          What is DApp Token Staking?
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          DApp Token Staking is a revolutionary way to participate in and support our blockchain
          network. By staking your DApp tokens, you actively contribute to the security and
          functionality of the platform, all while earning attractive rewards for your commitment.
        </Text>
      </Stack>
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Money Bag'>
            💰
          </span>{' '}
          Why Stake Your DApp Tokens?
        </Heading>
        <Checklist
          items={reasons}
          render={reason => (
            <Flex as='li' key={reason.id}>
              <Circle size='3.2rem'>{reason.id}</Circle>
              <Flex direction='column' gutter='sm'>
                <Text fontSize='lg' fontWeight='bold'>
                  {reason.title}
                </Text>
                <Text fontSize='lg' color='dark'>
                  {reason.description}
                </Text>
              </Flex>
            </Flex>
          )}
        />
      </Stack>
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Wrench'>
            🛠️
          </span>{' '}
          How DApp Token Staking Works:
        </Heading>
        <Checklist
          items={steps}
          render={step => (
            <Flex as='li' key={step.id}>
              <Circle size='3.2rem'>{step.id}</Circle>
              <Flex direction='column' gutter='sm'>
                <Text fontSize='lg' fontWeight='bold'>
                  {step.title}
                </Text>
                <Text fontSize='lg' color='dark'>
                  {step.description}
                </Text>
              </Flex>
            </Flex>
          )}
        />
      </Stack>
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Lock'>
            🔒
          </span>{' '}
          Security and Transparency
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          Your security is our top priority. We have implemented robust security measures to
          safeguard your staked tokens and ensure the integrity of the staking process. Furthermore,
          our staking mechanisms are fully transparent, allowing you to track your rewards and
          staking progress in real-time.
        </Text>
      </Stack>
      <Stack>
        <Heading as='h2'>
          <span role='img' aria-label='Magnifying Glass'>
            🔍
          </span>{' '}
          Get Started Today!
        </Heading>
        <Text fontSize='lg' color='dark' align='justify'>
          DApp Token Staking provides an incredible opportunity to earn rewards while actively
          supporting the blockchain network. Don't miss out on this chance to be part of the future
          of decentralized technology.
        </Text>
        <Text fontSize='lg' color='dark' align='justify'>
          <strong>
            <span role='img' aria-label='Scroll'>
              📜
            </span>{' '}
            Disclaimer:
          </strong>{' '}
          Staking involves financial risk and is not suitable for everyone. Please do your own
          research and consider your risk tolerance before participating in staking. The information
          provided on this page does not constitute financial advice.
        </Text>
      </Stack>
    </Stack>
  )
}

export default StakingContent
