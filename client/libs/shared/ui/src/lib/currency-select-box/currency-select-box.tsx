import { tokensUrl } from '@shared/constants'
import { Token } from '@shared/models'
import { ChangeEvent, Fragment, useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import styled from 'styled-components'
import { useBoolean, useFetch } from 'usehooks-ts'

import Flex from '../flex/flex'
import Input from '../input/input'
import Stack from '../stack/stack'
import Text from '../text/text'

const CurrencySelectWrapper = styled(Flex)`
  align-items: center;
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  justify-content: space-between; /* Adjust alignment */
  padding: 0.8rem 1.6rem;
  position: relative;
  width: 150px;

  &:hover {
    border-color: var(--color-black-300);
  }
`

const CurrencyIcon = styled.img`
  height: 24px;
  width: 24px;
`

const CurrencyName = styled(Text)`
  flex-grow: 1;
  font-weight: bold;
`

const CurrencySelectArrow = styled(Flex)`
  align-items: center;
  justify-content: center;
`

const CurrencyOptions = styled(Stack)`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-black-200);
  box-shadow: var(--shadow);
  max-height: 400px;
  padding: 0.8rem 1.6rem;
  width: 250px;
  overflow-y: auto;

  position: absolute;
  left: 0;
  top: 4.5rem;
  z-index: 2;
`

const CurrencyOption = styled(Flex)`
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  padding: 0.8rem 1.6rem;

  &:hover {
    background-color: var(--color-black-200);
  }
`

const FilterInput = styled(Input)`
  margin-bottom: 0.4rem; /* Add some spacing */
`

export interface CurrencySelectProps {
  currency: Token | undefined
  onCurrencySelect: (token: Token) => void
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  currency: token,
  onCurrencySelect: onSelectToken
}) => {
  const { value: open, toggle } = useBoolean(false)
  const { data, error } = useFetch<{ tokens: Token[] }>(tokensUrl)
  const [filter, setFilter] = useState('')

  const filteredTokens =
    data?.tokens.filter(token => token.name.toLowerCase().includes(filter.toLowerCase())) ?? []

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFilter(value)
  }

  const handleFilterClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
  }

  if (error) {
    throw error
  }

  return (
    <CurrencySelectWrapper onClick={toggle}>
      {token ? (
        <Fragment>
          <CurrencyIcon src={token?.logoURI} />
          <CurrencyName>{token?.symbol}</CurrencyName>
        </Fragment>
      ) : (
        <Text fontSize='md' fontWeight='bold'>
          Select a token
        </Text>
      )}
      <CurrencySelectArrow>{open ? <HiChevronUp /> : <HiChevronDown />}</CurrencySelectArrow>
      {open && (
        <CurrencyOptions>
          <FilterInput value={filter} onChange={handleFilterChange} onClick={handleFilterClick} />
          {filteredTokens.map((option: Token, i) => (
            <CurrencyOption key={i} onClick={() => onSelectToken(option)}>
              <CurrencyIcon src={option.logoURI} />
              <CurrencyName>{option?.name}</CurrencyName>
            </CurrencyOption>
          ))}
        </CurrencyOptions>
      )}
    </CurrencySelectWrapper>
  )
}

export default CurrencySelect
