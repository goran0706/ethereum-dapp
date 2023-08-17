import styled from 'styled-components'

export const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-lg);
  display: none;

  &:focus ~ label {
    box-shadow: 0 0 0 2px var(--color-brand-600);
  }
`

export const FileInputLabel = styled.label`
  background-color: var(--color-brand-600);
  border-radius: var(--border-radius-lg);
  color: var(--color-brand-50);
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  margin-right: 1.2rem;
  padding: 0.6rem 1.2rem;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`

export default FileInput
