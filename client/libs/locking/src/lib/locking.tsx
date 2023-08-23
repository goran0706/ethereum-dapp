import { Grid, Stack, Sticky } from '@shared/ui'
import { Outlet } from 'react-router-dom'

import LockingContent from './components/locking-content/locking-content'

export function Locking() {
  return (
    <Grid gutter='xxl' $minItemWidth='480px'>
      <LockingContent />
      <Sticky>
        <Stack align='start' justify='center'>
          <Outlet />
          {/* <Calculator /> */}
        </Stack>
      </Sticky>
    </Grid>
  )
}

export default Locking
