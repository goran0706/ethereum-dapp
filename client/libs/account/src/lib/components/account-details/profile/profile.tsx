import { useCurrencyMask } from '@shared/store'
import { ConnectButton, Flex, Mask, Text } from '@shared/ui'
import { Avatar } from 'connectkit'
import styled from 'styled-components'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'

const ProfileContainer = styled(Flex)`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-50);
  box-shadow: var(--shadow);
  padding: 1.6rem 4rem;
  gap: 1.6rem;
  width: 480px;
`

export const Profile = () => {
  const { isCurrencyMasked } = useCurrencyMask()
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })

  if (!address) {
    return <ConnectButton />
  }

  return (
    <ProfileContainer
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      {ensAvatar ? (
        <img src={ensAvatar} alt='Avatar' />
      ) : (
        <Avatar size={128} address={address} />
      )}
      {isCurrencyMasked ? (
        <Mask height='24px' width='100%' />
      ) : (
        <Text fontSize='lg' fontWeight='bold' align='center'>
          {ensName ? `${ensName} (${address})` : address}
        </Text>
      )}
    </ProfileContainer>
  )
}

export default Profile
