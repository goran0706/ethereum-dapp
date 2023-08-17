import styled from 'styled-components'

/* eslint-disable-next-line */
export interface ProtectedRouteProps {}

const StyledProtectedRoute = styled.div`
  color: pink;
`

/* TODO: Protected route */
export function ProtectedRoute(props: ProtectedRouteProps) {
  return (
    <StyledProtectedRoute>
      <h1>Welcome to ProtectedRoute!</h1>
    </StyledProtectedRoute>
  )
}

export default ProtectedRoute
