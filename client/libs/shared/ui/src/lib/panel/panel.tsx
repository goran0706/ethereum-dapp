import styled from 'styled-components'

interface PanelProps {
  width?: string
  height?: string
}

export const Panel = styled.div<PanelProps>`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-200);
  box-shadow: var(--shadow);
  padding: 4rem 3.2rem;
  width: ${props => props.width};
  height: ${props => props.height};
`

export default Panel
