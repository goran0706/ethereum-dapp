import { device } from '@shared/constants'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import Container from '../container/container'
import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0;

  grid-template-areas:
    'sidebar header'
    'sidebar main';
  grid-template-columns: 26rem 1fr;
  height: 100vh;
`

const Main = styled.main`
  background-color: var(--color-black-200);
  overflow-y: auto;
  padding: 4rem;
  flex: 1;

  @media ${device.md} {
    padding: 2rem;
  }
`

export function AppLayout() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <Main>
        <Container $maxWidth='140rem' gutter='xxl'>
          <Outlet />
        </Container>
      </Main>
    </Layout>
  )
}

export default AppLayout
