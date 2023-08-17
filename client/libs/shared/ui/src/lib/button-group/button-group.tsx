import styled from 'styled-components'

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center; /* Vertically align buttons */

  gap: 1.2rem;

  @media (max-width: 768px) {
    justify-content: center; /* Center buttons on small screens */
  }
`

export default ButtonGroup
