import { Blur, Blurdark } from '@shared/assets'
import styled from 'styled-components'
import { useDarkMode } from 'usehooks-ts'

export interface MaskProps {
  width?: string
  height?: string
}

const StyledImage = styled.img`
  object-fit: cover;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
`

export function Mask({ ...props }: MaskProps) {
  const { isDarkMode } = useDarkMode()
  const mask = isDarkMode ? Blurdark : Blur
  return <StyledImage src={mask} alt='********' {...props} />
}

export default Mask
