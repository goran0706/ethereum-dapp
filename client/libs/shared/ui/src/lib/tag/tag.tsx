import styled from 'styled-components'

interface TagProps {
  type: 'black' | 'blue' | 'green' | 'yellow' | 'silver' | 'indigo' | 'red' | 'brand'
}

export const Tag = styled.span<TagProps>`
  background-color: var(--color-${props => props.type}-100);
  border-radius: var(--border-radius-lg);
  color: var(--color-${props => props.type}-700);
  font-size: 1.2rem;
  font-weight: 600;
  height: fit-content;
  padding: 0.4rem 1.2rem;
  text-transform: uppercase;
  width: fit-content;
`

export default Tag
