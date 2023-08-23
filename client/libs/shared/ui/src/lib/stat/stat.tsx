import { commafy } from '@utils'
import { lighten } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'

import Flex from '../flex/flex'
import Mask from '../mask/mask'
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

  const updateValue = useCallback(() => {
    setAnimatedValue(prevAnimatedValue => {
      const diff = value - prevAnimatedValue
      const increment = Math.ceil(diff / 15) // 60 frames per second
      const newAnimatedValue = prevAnimatedValue + increment
      return newAnimatedValue >= value ? value : newAnimatedValue
    })
  }, [value])

  useEffect(() => {
    if (isAnimated && animatedValue < value) {
      const animationId = requestAnimationFrame(updateValue)
      return () => cancelAnimationFrame(animationId)
    }
  }, [isAnimated, animatedValue, updateValue, value])

  return (
    <StyledStat color={color}>
      {Icon && (
        <StyledIcon color={color}>
          <Icon size={48} fill={color} />
        </StyledIcon>
      )}
      <Stack gutter='xs'>
        {isCurrencyMasked ? (
          <Mask height='24px' width='200px' />
        ) : (
          <Text fontSize='lg' fontWeight='bolder'>
            {`${commafy(animatedValue)} ${symbol}`}
          </Text>
        )}
        <Text fontSize='lg' fontWeight='bold'>
          {label}
        </Text>
      </Stack>
    </StyledStat>
  )
}

export default Stat
