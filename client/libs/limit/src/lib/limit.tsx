import { Candlestick, Grid, Stack } from '@shared/ui'

import LimitOrderForm from './components/limit-form/limit-form'

export function LimitOrders() {
  return (
    <Grid gutter='xxl' $minItemWidth='480px'>
      <Candlestick />
      <Stack align='start' justify='center'>
        <LimitOrderForm />
      </Stack>
    </Grid>
  )
}

export default LimitOrders
