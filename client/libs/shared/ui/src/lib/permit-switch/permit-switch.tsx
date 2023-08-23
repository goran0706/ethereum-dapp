import Flex from '../flex/flex'
import Switch, { SwitchProps } from '../switch/switch'
import Text from '../text/text'

export function PermitSwitch({ isOn, onToggle }: SwitchProps) {
  return (
    <Flex alignItems='center' justifyContent='flex-end'>
      <Text fontSize='md'>Permitable</Text>
      <Switch isOn={isOn} onToggle={onToggle} />
    </Flex>
  )
}

export default PermitSwitch
