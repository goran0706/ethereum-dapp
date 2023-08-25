import { ReactNode } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'

import Center from '../center/center'
import ConnectButton from '../connect-button/connect-button'
import Text from '../text/text'

const StyledFallback = styled(Center)`
  margin-top: 4rem;
  gap: 2rem;
`

const Fallback = () => {
  return (
    <StyledFallback $centerChildren $centerText>
      <Text>
        No wallet connected yet. Please connect in order to interact with the
        application.
      </Text>
      <ConnectButton />
    </StyledFallback>
  )
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isConnected } = useAccount()
  return isConnected ? children : <Fallback />
}

export default ProtectedRoute
