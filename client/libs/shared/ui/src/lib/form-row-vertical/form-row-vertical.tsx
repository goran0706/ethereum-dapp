import Label from '../label/label'
import Stack from '../stack/stack'
import Text from '../text/text'

export interface FormRowVerticalProps {
  label: string
  errorMessage: string
  children: JSX.Element
}

const FormRowVertical = ({ label, errorMessage, children }: FormRowVerticalProps) => {
  const { id } = children?.props ?? {}

  return (
    <Stack>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {errorMessage && <Text color='red'>{errorMessage}</Text>}
    </Stack>
  )
}

export default FormRowVertical
