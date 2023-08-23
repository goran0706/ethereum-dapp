import { useCurrencyMask } from '@shared/store'
import { ConnectKitButton } from 'connectkit'

import Button from '../button/button'
import Mask from '../mask/mask'

export function ConnectButton() {
  const { isCurrencyMasked } = useCurrencyMask()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button onClick={show}>
            {isConnected ? (
              isCurrencyMasked ? (
                <Mask height='15px' width='89.5rem' />
              ) : (
                ensName ?? truncatedAddress
              )
            ) : (
              'Connect Wallet'
            )}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default ConnectButton
