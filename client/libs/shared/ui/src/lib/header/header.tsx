import { ChainIcon } from 'connectkit'
import styled from 'styled-components'
import { useBlockNumber, useFeeData, useNetwork } from 'wagmi'

import ColorModeSwitch from '../color-mode-switch/color-mode-switch'
import ConnectButton from '../connect-button/connect-button'
import Flex from '../flex/flex'
import Text from '../text/text'

const StyledHeader = styled.header`
  grid-area: header;

  background-color: var(--color-black-50);
  border-bottom: 1px solid var(--color-black-50);
  padding: 1.2rem 4.8rem;
`

const HeaderItem = styled(Flex)`
  background-color: var(--color-black-200);
  border-radius: var(--border-radius-lg);
  color: var(--color-black-800);
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0.6rem 1.2rem;
  align-items: center;
  justify-content: center;
`

export function Header() {
  const {
    data: fee,
    isError: isFeeError,
    isLoading: isFeeLoading
  } = useFeeData({ formatUnits: 'gwei' })

  const {
    data: blockNumber,
    isError: isBlockNumberError,
    isLoading: isBlockNumberLoading
  } = useBlockNumber()

  const { chain } = useNetwork()

  return (
    <StyledHeader>
      <Flex align='center' justify='flex-end' wrap='wrap'>
        <HeaderItem>
          <Text>🔥</Text>
          <Text>
            {isFeeLoading
              ? 'Fetching gas price...'
              : isFeeError
              ? 'Error fetching gas price'
              : fee && fee.formatted.gasPrice}
          </Text>
        </HeaderItem>
        <HeaderItem>
          <Text>🧊</Text>
          <Text>
            {isBlockNumberLoading
              ? 'Fetching blocknumber...'
              : isBlockNumberError
              ? 'Error fetching blocknumber'
              : blockNumber?.toString()}
          </Text>
        </HeaderItem>
        <HeaderItem>
          {chain && <ChainIcon id={chain?.id} unsupported={chain?.unsupported} size={20} />}
          <Text>{chain ? chain.name : 'Not connected'}</Text>
        </HeaderItem>
        <ConnectButton />
        <ColorModeSwitch />
      </Flex>
    </StyledHeader>
  )
}

export default Header
