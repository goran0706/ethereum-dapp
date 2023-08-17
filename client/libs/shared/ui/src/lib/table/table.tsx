import { device } from '@shared/constants'
import { ReactNode, createContext, useContext } from 'react'
import styled from 'styled-components'

interface TableProps {
  columns?: string
  children: ReactNode
}

type TableContextType = string

const TableContext = createContext<TableContextType>('')

const StyledTable = styled.ul`
  border: none;
  font-size: 1.4rem;
  margin: 0 auto;
  width: 100%;
`

const StyledHeader = styled.li<{ columns: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  background-color: var(--color-black-50);
  border-bottom: 1px solid var(--color-black-300);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--color-black-800);
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 0.4rem;
  padding: 1.2rem 2.4rem;
  text-transform: uppercase;

  p {
    color: var(--color-black-800);
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 0.4rem;
  }

  @media ${device.xxl} {
    grid-template-columns: repeat(auto-fit, minmax(fit-content, 1fr));
  }
  @media ${device.xl} {
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  }
  @media ${device.md} {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    gap: 1rem;
  }
`

const StyledRow = styled.li<{ columns: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  background-color: var(--color-black-50);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--color-black-800);
  margin: 1.2rem 0;
  padding: 1.2rem 2.4rem;

  p {
    font-weight: 400;
    color: var(--color-black-800);
  }

  @media ${device.xxl} {
    grid-template-columns: repeat(auto-fit, minmax(fit-content, 1fr));
  }
  @media ${device.xl} {
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  }
  @media ${device.md} {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    gap: 1rem;
  }
`

function Table({ columns = 'auto', children }: TableProps) {
  return (
    <TableContext.Provider value={columns}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  )
}

function Header({ children }: { children: ReactNode }) {
  const columns = useContext(TableContext)
  return <StyledHeader columns={columns}>{children}</StyledHeader>
}

function Row({ children }: { children: ReactNode }) {
  const columns = useContext(TableContext)
  return <StyledRow columns={columns}>{children}</StyledRow>
}

Table.Header = Header
Table.Row = Row

export default Table
