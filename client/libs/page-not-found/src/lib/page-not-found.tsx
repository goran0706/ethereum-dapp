import { Button, Center, Heading } from '@shared/ui'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledPageNotFound = styled.main`
  align-items: center;
  background-color: var(--color-black-50);
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 4.8rem;
`

const Box = styled(Center)`
  background-color: var(--color-black-0);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-100);

  flex: 0 1 96rem;
  padding: 4.8rem;
  text-align: center;

  h1 {
    margin-bottom: 1.6rem;
  }

  p {
    margin-bottom: 3.2rem;
  }
`

export function PageNotFound() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as='h1'>The page you are looking for could not be found</Heading>
        <Button size='large' onClick={handleGoBack}>
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  )
}

export default PageNotFound
