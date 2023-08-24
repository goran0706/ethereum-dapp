import { useCurrencyMask } from '@shared/store'
import { Flex, IconButton } from '@shared/ui'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { MdOutlineLogout } from 'react-icons/md'
import styled from 'styled-components'
import { useAccount, useDisconnect, useNetwork } from 'wagmi'

const PreferencesContainer = styled(Flex)`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-100);
  box-shadow: var(--shadow);
  padding: 1rem;
  gap: 1.6rem;
`

export const Preferences = () => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { isCurrencyMasked, toggle } = useCurrencyMask()
  const blockExplorerUrl = `${chain?.blockExplorers?.default.url}/address/${address}`

  return (
    <PreferencesContainer>
      <IconButton onClick={toggle}>
        {isCurrencyMasked ? <AiFillEye /> : <AiFillEyeInvisible />}
      </IconButton>
      <IconButton
        as='a'
        href={blockExplorerUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        <BiLinkExternal />
      </IconButton>
      <IconButton onClick={() => disconnect()}>
        <MdOutlineLogout />
      </IconButton>
    </PreferencesContainer>
  )
}

export default Preferences
