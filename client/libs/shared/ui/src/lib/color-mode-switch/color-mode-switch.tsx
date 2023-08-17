import { useEffect } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { useDarkMode } from 'usehooks-ts'

import IconButton from '../icon-button/icon-button'

const ColorModeSwitch = () => {
  const { isDarkMode, toggle } = useDarkMode()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  return (
    <IconButton onClick={toggle}>{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</IconButton>
  )
}

export default ColorModeSwitch
