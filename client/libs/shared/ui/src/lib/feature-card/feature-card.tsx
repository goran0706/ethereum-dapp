import { darken, lighten } from 'polished'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Card, CardBody, CardFooter, CardHeader } from '../card/card'
import Heading from '../heading/heading'
import Text from '../text/text'

export interface FeatureCardProps {
  Icon: IconType
  href: string
  color: string
  title: string
  description: string
}

const glowAnimation = (color?: string) => keyframes`
  0%, 100% {
    box-shadow: 0 0 10px ${color};
  }
  50% {
    box-shadow: 0 0 20px ${color};
  }
`

const StyledLink = styled(Link)<{ color?: string }>`
  animation: ${({ color }) => glowAnimation(color)} 1.5s linear infinite;
  background-color: ${props => (props.color ? lighten(0.3, props.color) : 'var(--color-blue-100)')};
  border-radius: var(--border-radius-lg);
  border: 2px solid ${props => props.color ?? 'var(--color-blue-100)'};
  color: ${props => (props.color ? darken(0.3, props.color) : 'var(--color-blue-100)')};
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: ${props => (props.color ? props.color : 'var(--color-blue-100)')};
  }
`

export function FeatureCard({ Icon, href, color, title, description }: FeatureCardProps) {
  return (
    <Card gutter='xs'>
      <CardHeader color={color} $centerChildren>
        <Icon size='48px' />
      </CardHeader>
      <CardBody>
        <Heading as='h3'>{title}</Heading>
        <Text align='justify' color='dark'>
          {description}
        </Text>
      </CardBody>
      <CardFooter $centerChildren>
        <StyledLink to={href} color={color}>
          {title}
        </StyledLink>
      </CardFooter>
    </Card>
  )
}

export default FeatureCard
