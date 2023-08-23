import { Grid, Stack, Sticky } from '@shared/ui'
import { Outlet } from 'react-router-dom'

import StakingContent from './components/staking-content/staking-content'

export function Staking() {
  return (
    <Grid gutter='xxl' $minItemWidth='480px'>
      <StakingContent />
      <Sticky>
        <Stack align='start' justify='center'>
          <Outlet />
          {/* <Calculator /> */}
        </Stack>
      </Sticky>
    </Grid>
  )
}

export default Staking
