import styled from 'styled-components'

import Logo from '../logo/logo'
import Navigation from '../navigation/navigation'
import Stack from '../stack/stack'

const StyledSidebar = styled(Stack)`
  grid-area: sidebar;
  grid-template-rows: auto 1fr;

  background-color: var(--color-black-50);
  border-right: 1px solid var(--color-black-50);
  padding: 1.2rem 2.4rem;
`

export function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <Navigation />
    </StyledSidebar>
  )
}

export default Sidebar
