import { BsCurrencyExchange } from 'react-icons/bs'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { RiCoinsFill } from 'react-icons/ri'

export const featuresData = [
  {
    id: 0,
    Icon: GiPayMoney,
    href: '/locking',
    color: 'gold',
    title: 'Locking',
    description:
      'Secure your assets and earn passive rewards by locking your tokens. Our Token Locking feature offers peace of mind and growth potential, all in one easy step. Start locking now and watch your holdings thrive!'
  },
  {
    id: 1,
    Icon: GiReceiveMoney,
    href: '/staking',
    color: 'lawngreen',
    title: 'Staking',
    description:
      'Enhance your crypto gains with our Token Staking feature. Lock, earn, and grow effortlessly - all while helping to secure the network. Stake now and enjoy passive rewards for holding your tokens!'
  },
  {
    id: 2,
    Icon: BsCurrencyExchange,
    href: '/swap',
    color: 'deepskyblue',
    title: 'Swap',
    description:
      'Seamlessly trade your tokens with our Token Swap feature. Swap between different cryptocurrencies with ease and speed. Unlock a world of possibilities and take control of your portfolio. Experience the power of instant token swaps today!'
  },
  {
    id: 3,
    Icon: RiCoinsFill,
    href: '/limit-orders',
    color: 'slateblue',
    title: 'Limit Orders',
    description:
      'Take control of your trades with Limit Orders. Set specific price targets to buy or sell tokens automatically when the market conditions match your preferences. Never miss out on the best opportunities. Maximize your trading potential with ease!'
  }
  // {
  //   id: 4,
  //   Icon: FaSellsy,
  //   href: '/perpetuals',
  //   color: 'sandybrown',
  //   title: 'Perpetuals',
  //   description:
  //     'Discover endless trading possibilities with Token Perpetuals. Trade with leverage, go long or short on tokens, and seize market opportunities around the clock. Experience the excitement of perpetual trading and take your strategies to new heights!'
  // }
]

export const analyticsConfig = {
  defs: [
    { colorId: 'tvl', colorValue: '#8884d8' },
    { colorId: 'supply', colorValue: '#82ca9d' },
    { colorId: 'cap', colorValue: '#ca82b8' },
    { colorId: 'rewards', colorValue: '#e0c141' },
    { colorId: 'holders', colorValue: '#f06b4d' }
  ],
  areas: [
    { dataKey: 'tvl', colorId: 'tvl', colorValue: '#8884d8' },
    { dataKey: 'supply', colorId: 'supply', colorValue: '#82ca9d' },
    { dataKey: 'cap', colorId: 'cap', colorValue: '#ca82b8' },
    { dataKey: 'rewards', colorId: 'rewards', colorValue: '#e0c141' },
    { dataKey: 'holders', colorId: 'holders', colorValue: '#f06b4d' }
  ]
}

export const analyticsData = [
  {
    name: 'June 25',
    tvl: 4000,
    supply: 2400,
    cap: 3000,
    rewards: 982,
    holders: 152,
    amt: 2400
  },
  {
    name: 'June 26',
    tvl: 3000,
    supply: 1398,
    cap: 3000,
    rewards: 982,
    holders: 152,
    amt: 2210
  },
  {
    name: 'June 27',
    tvl: 2000,
    supply: 9800,
    cap: 3000,
    rewards: 982,
    holders: 152,
    amt: 2290
  },
  {
    name: 'June 28',
    tvl: 2780,
    supply: 3908,
    cap: 3000,
    rewards: 982,
    holders: 152,
    amt: 2000
  },
  {
    name: 'June 29',
    tvl: 1890,
    supply: 4800,
    cap: 3000,
    rewards: 982,
    holders: 152,
    amt: 2181
  },
  {
    name: 'June 30',
    tvl: 2390,
    supply: 3800,
    cap: 3000,
    rewards: 982,
    holders: 152,
    amt: 2500
  },
  {
    name: 'June 31',
    tvl: 3490,
    supply: 4300,
    cap: 3000,
    rewards: 982,
    holders: 152,
    amt: 2100
  }
]

export const distributionData = [
  {
    label: 'Initial Token Distribution',
    data: [
      { name: 'Reward HODL', value: 100000 },
      { name: 'Treasury HODL', value: 200000 },
      { name: 'Early Investors', value: 200000 },
      { name: 'Community Members', value: 500000 }
    ]
  },
  {
    label: 'Current Token Distribution',
    data: [
      { name: 'Reward HODL', value: 100000 },
      { name: 'Treasury HODL', value: 200000 },
      { name: 'Early Investors', value: 200000 },
      { name: 'Community Members', value: 500000 }
    ]
  },
  {
    label: 'Locking Contract',
    data: [
      { name: 'ETH', value: 675 },
      { name: 'USD', value: 364 }
    ]
  },
  {
    label: 'Staking Contract',
    data: [
      { name: 'ETH', value: 675 },
      { name: 'USD', value: 364 }
    ]
  }
]
