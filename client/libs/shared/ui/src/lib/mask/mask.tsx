import { Blur, Blurdark } from '@shared/assets'
import { useDarkMode } from 'usehooks-ts'

export interface MaskProps {
  width?: string
  height?: string
}

export function Mask({ ...props }: MaskProps) {
  const { isDarkMode } = useDarkMode()
  const mask = isDarkMode ? Blurdark : Blur
  return <img src={mask} alt='********' {...props} />
}

export default Mask
