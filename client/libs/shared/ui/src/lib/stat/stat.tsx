import { Blur, Blurdark } from '@shared/assets'
import { commafy } from '@utils'
import { lighten } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'
import { useDarkMode } from 'usehooks-ts'

import Flex from '../flex/flex'
import Stack from '../stack/stack'
import Text from '../text/text'

const StyledStat = styled(Flex)<{ color?: string }>`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-50);
  border-bottom: 4px solid ${props => (props.color ? props.color : 'var(--color-blue-100)')};
  box-shadow: var(--shadow);
  padding: 1.6rem;
  align-items: center;
  justify-content: flex-start;

  p {
    white-space: nowrap;
  }
`

const StyledIcon = styled.span<{ color?: string }>`
  display: flex;
  aspect-ratio: 1 / 1;
  background-color: ${props => (props.color ? lighten(0.4, props.color) : 'var(--color-blue-100)')};
  border: 2px solid ${props => (props.color ? props.color : 'var(--color-blue-100)')};
  border-radius: 100%;
  padding: 0.6rem;
`

export interface StatProps {
  label: string
  value: number
  symbol?: string
  color?: string
  Icon?: IconType
  isCurrencyMasked?: boolean
  isAnimated?: boolean
}

// Todo: fix colorMode and commafy
export function Stat({
  label,
  value,
  symbol,
  color,
  Icon,
  isCurrencyMasked,
  isAnimated
}: StatProps) {
  const [animatedValue, setAnimatedValue] = useState(isAnimated ? 0 : value)
  const { isDarkMode } = useDarkMode()
  const mask = isDarkMode ? Blurdark : Blur

  const updateValue = useCallback(() => {
    setAnimatedValue(prevAnimatedValue => {
      if (prevAnimatedValue >= value) return prevAnimatedValue
      const diff = value - prevAnimatedValue
      const increment = Math.ceil(diff / 15) // 60 frames per second
      const newAnimatedValue = prevAnimatedValue + increment
      return newAnimatedValue >= value ? value : newAnimatedValue
    })
  }, [value])

  useEffect(() => {
    let animationId: number
    const animate = () => {
      updateValue()
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationId)
  }, [updateValue])

  return (
    <StyledStat color={color}>
      {Icon && (
        <StyledIcon color={color}>
          <Icon size={48} fill={color} />
        </StyledIcon>
      )}
      <Stack gutter='xs'>
        <Flex>
          <Text fontSize='lg' fontWeight='bolder'>
            {isCurrencyMasked ? (
              <img src={mask} height={16} alt='******' />
            ) : (
              commafy(animatedValue)
            )}
          </Text>
          <Text fontSize='lg' fontWeight='bolder'>
            {isCurrencyMasked ? <img src={mask} height={16} alt='******' /> : symbol}
          </Text>
        </Flex>
        <Text fontSize='lg' fontWeight='bold'>
          {label}
        </Text>
      </Stack>
    </StyledStat>
  )
}

export default Stat
