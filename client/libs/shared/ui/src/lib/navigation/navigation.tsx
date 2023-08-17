import { FC } from 'react'
import { BsCurrencyExchange } from 'react-icons/bs'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { HiOutlineHome } from 'react-icons/hi2'
import { MdAccountCircle } from 'react-icons/md'
import { RiCoinsFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Divider from '../divider/divider'
import Stack from '../stack/stack'
import Text from '../text/text'

const NavLinks = styled(Stack).attrs({ as: 'ul' })``

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.2rem;

    color: var(--color-black-700);
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-black-800);
    background-color: var(--color-black-200);
    border-radius: var(--border-radius-lg);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-black-800);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`

interface NavigationItemProps {
  to: string
  icon: JSX.Element
  text: string
}

const NavigationItem: FC<NavigationItemProps> = ({ to, icon, text }) => (
  <li>
    <StyledNavLink to={to}>
      {icon}
      <Text fontSize='lg' fontWeight='medium'>
        {text}
      </Text>
    </StyledNavLink>
  </li>
)

const Navigation: FC = () => {
  return (
    <nav>
      <NavLinks>
        <NavigationItem to='/dashboard' icon={<HiOutlineHome />} text='Home' />
        <NavigationItem to='/locking' icon={<GiPayMoney />} text='Locking' />
        <NavigationItem to='/staking' icon={<GiReceiveMoney />} text='Staking' />
        <NavigationItem to='/swap' icon={<BsCurrencyExchange />} text='Swap' />
        <NavigationItem to='/limit-orders' icon={<RiCoinsFill />} text='Limit Orders' />
        <Divider type='horizontal' />
        <NavigationItem to='/account' icon={<MdAccountCircle />} text='Account' />
      </NavLinks>
    </nav>
  )
}

export default Navigation
