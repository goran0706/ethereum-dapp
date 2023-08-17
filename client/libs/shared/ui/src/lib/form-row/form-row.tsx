import styled from 'styled-components'

import Grid from '../grid/grid'
import Label from '../label/label'
import Text from '../text/text'

export interface FormRowProps {
  label: string
  errorMessage?: string
  children: JSX.Element
}

const StyledFormRow = styled(Grid)`
  align-items: center;
  justify-content: center;
`

export function FormRow({ label, errorMessage, children }: FormRowProps) {
  return (
    <StyledFormRow>
      {label ? <Label htmlFor={children.props.id}>{label}</Label> : null}
      {children}
      {errorMessage && <Text color='red'>{errorMessage}</Text>}
    </StyledFormRow>
  )
}

export default FormRow
