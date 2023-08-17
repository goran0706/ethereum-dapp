import styled from 'styled-components'

export const Sticky = styled.div`
  > * {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
  }
`
