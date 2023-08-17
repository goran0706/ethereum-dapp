import { useCurrencySelect } from '@shared/store'
import styled from 'styled-components'
import { useDarkMode } from 'usehooks-ts'

const StyledCandlestick = styled.div`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-50);
  box-shadow: var(--shadow);
  padding: 1.6rem;
  height: 80vh;
  width: 100%;
  resize: both;
  overflow: hidden;
`

export function Candlestick() {
  const { currencyIn, currencyOut } = useCurrencySelect(state => state)
  const { isDarkMode } = useDarkMode()
  const theme = isDarkMode ? 'dark' : 'light'

  const srcUrl = `https://dexscreener.com/${currencyIn}/${currencyOut}?embed=1&theme=${theme}&info=0`

  return (
    <StyledCandlestick>
      <iframe src={srcUrl} height='100%' width='100%' frameBorder={0} title='dexScreener' />
    </StyledCandlestick>
  )
}

export default Candlestick
