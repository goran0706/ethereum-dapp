import Center from '../center/center'
import Heading from '../heading/heading'

export function Logo() {
  return (
    <Center $centerText $centerChildren>
      <Heading as='h1' color='black'>
        Logo
      </Heading>
    </Center>
  )
}

export default Logo
