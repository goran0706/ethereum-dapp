import { spacings } from '@shared/constants'
import styled from 'styled-components'

import Button from '../button/button'
import Center from '../center/center'
import Heading from '../heading/heading'
import Text from '../text/text'

const StyledErrorFallback = styled.main`
  align-items: center;
  background-color: var(--color-black-50);
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: ${spacings.xl};
`

const Box = styled(Center)`
  background-color: var(--color-black-200);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-300);
  flex: 0 1 96rem;
  padding: ${spacings.xl};
  text-align: center;

  h1 {
    margin-bottom: ${spacings.lg};
  }

  p {
    margin-bottom: ${spacings.xl};
  }
`

export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <StyledErrorFallback>
      <Box>
        <Heading as='h1'>Something went wrong</Heading>
        <Text fontSize='lg'>{error.message}</Text>
        <Button variation='primary' size='large' onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Box>
    </StyledErrorFallback>
  )
}

export default ErrorFallback
