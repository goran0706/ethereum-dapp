import { Candlestick, Grid, Stack } from '@shared/ui'

import SwapForm from './components/swap-form/swap-form'

export function Swap() {
  return (
    <Grid gutter='xxl' $minItemWidth='480px'>
      <Candlestick />
      <Stack align='start' justify='center'>
        <SwapForm />
      </Stack>
    </Grid>
  )
}

export default Swap
