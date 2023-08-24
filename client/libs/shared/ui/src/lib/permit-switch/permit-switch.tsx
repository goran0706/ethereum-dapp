import styled from 'styled-components'

import Flex from '../flex/flex'
import Switch, { SwitchProps } from '../switch/switch'
import Text from '../text/text'

const StyledPermitSwitch = styled(Flex)`
  padding: 1.2rem;
`

export function PermitSwitch({ isOn, onToggle }: SwitchProps) {
  return (
    <StyledPermitSwitch alignItems='center' justifyContent='flex-end'>
      <Text fontSize='md'>Use Permit</Text>
      <Switch isOn={isOn} onToggle={onToggle} />
    </StyledPermitSwitch>
  )
}

export default PermitSwitch
