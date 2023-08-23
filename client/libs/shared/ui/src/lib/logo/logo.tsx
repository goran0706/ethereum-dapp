import Center from '../center/center'
import Heading from '../heading/heading'

export function Logo() {
  return (
    <Center $centerText $centerChildren>
      <Heading as='h1' color='black'>
        LuminaX
      </Heading>
    </Center>
  )
}

export default Logo
