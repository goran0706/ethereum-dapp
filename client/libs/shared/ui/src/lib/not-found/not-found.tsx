import Text from '../text/text'

export interface NotFoundProps {
  resourceName: string
}

export function NotFound({ resourceName }: NotFoundProps) {
  return <Text>No {resourceName} could be found.</Text>
}

export default NotFound
