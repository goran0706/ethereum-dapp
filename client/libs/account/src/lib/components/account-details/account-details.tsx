import { Flex } from '@shared/ui'

import Preferences from './preferences/preferences'
import Profile from './profile/profile'

export const AccountDetails = () => {
  return (
    <Flex alignItems='flex-start' justifyContent='space-between' wrap='wrap'>
      <Profile />
      <Preferences />
    </Flex>
  )
}

export default AccountDetails
