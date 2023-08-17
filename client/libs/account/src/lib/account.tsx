import { Stack } from '@shared/ui'

import AccountActivity from './components/account-activity/account-activity'
import AccountBalances from './components/account-balances/account-balances'
import AccountDetails from './components/account-details/account-details'

export const Account = () => {
  return (
    <Stack gutter='xxl'>
      <AccountDetails />
      <AccountBalances />
      <AccountActivity />
    </Stack>
  )
}

export default Account
