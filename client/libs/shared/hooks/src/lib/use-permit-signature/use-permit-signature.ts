import { ContractsInfo } from '@shared/constants'
import { PermitConfig } from '@shared/models'
import { Address, Signature, hexToSignature, zeroAddress } from 'viem'
import { useContractRead, useNetwork, useToken, useWalletClient } from 'wagmi'

export function usePermitSignature(
  token: Address,
  spender: Address,
  value: bigint,
  deadline: bigint,
  permitConfig?: PermitConfig
) {
  const { chain } = useNetwork()
  const { data: walletClient } = useWalletClient()
  const { data: tokenInfo } = useToken({ address: token })

  const { data: nonce } = useContractRead({
    ...ContractsInfo.Token,
    functionName: 'nonces',
    args: [walletClient?.account.address ?? zeroAddress]
  })

  const generateSignature = async (): Promise<Signature | undefined> => {
    if (!walletClient || !tokenInfo || nonce === undefined) {
      return undefined
    }

    try {
      const permitData = {
        domain: {
          name: permitConfig?.name ?? tokenInfo.name,
          version: permitConfig?.version ?? '1',
          chainId: permitConfig?.chainId ?? chain?.id,
          verifyingContract: token
        },
        types: {
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        },
        primaryType: 'Permit' as const,
        message: {
          owner: walletClient.account.address,
          spender,
          value,
          nonce,
          deadline
        }
      }

      const hex = await walletClient.signTypedData(permitData)
      const signature = hexToSignature(hex)

      return {
        v: signature.v,
        r: signature.r,
        s: signature.s
      }
    } catch (error) {
      console.error('Error generating permit signature:', error)
      return undefined
    }
  }

  return { generateSignature }
}

export default usePermitSignature
