// formatters

export function formatError(text: string) {
  // Regular expression pattern to match the error message
  const errorMessagePattern =
    /Details: Error: VM Exception while processing transaction: reverted with reason string '(.+)'/

  const errorMetaMaskTxSignature = /MetaMask Tx Signature: ([^.]+)\./

  // match any other exception e.g. metamask error
  const alternativeErrorMessagePattern = /"message":"([^"]+)\./

  // Extract the error message using the patterns
  const matches =
    text.match(errorMessagePattern) ||
    text.match(alternativeErrorMessagePattern) ||
    text.match(errorMetaMaskTxSignature)

  if (matches && matches.length >= 2) {
    const errorMessage = matches[1]
    return errorMessage.replace(/\\n/g, '\n') // Replace escape sequences with actual newlines
  } else {
    return ''
  }
}

export function shortenAddress(address = '', chars = 4): string {
  if (address.length <= chars * 2) {
    return address
  }

  const prefix = address.substring(0, chars)
  const suffix = address.substring(address.length - chars)

  return `${prefix}...${suffix}`
}
