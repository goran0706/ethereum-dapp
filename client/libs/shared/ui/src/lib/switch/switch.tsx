import styled from 'styled-components'

export interface SwitchProps {
  isOn: boolean
  onToggle: () => void
}

const SwitchContainer = styled.label<{ isOn: boolean }>`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${props =>
    props.isOn ? 'var(--color-brand-600)' : 'var(--color-black-200)'};
  color: var(--color-brand-50);
  border-radius: var(--border-radius-lg);
  cursor: pointer;

  :hover {
    background-color: ${props =>
      props.isOn ? 'var(--color-brand-700)' : 'var(--color-black-200)'};
  }
`

const Slider = styled.span<{ isOn: boolean }>`
  position: absolute;
  top: 0.2rem;
  left: ${props => (props.isOn ? '26px' : '2px')};
  width: 20px;
  height: 20px;
  background-color: ${props =>
    props.isOn ? 'white' : 'var(--color-black-400)'};
  border-radius: 50%;
  transition: 0.2s;

  :hover {
    background-color: ${props =>
      props.isOn ? 'white' : 'var(--color-black-500)'};
  }
`

export const Switch = ({ isOn, onToggle }: SwitchProps) => {
  return (
    <SwitchContainer isOn={isOn} onClick={onToggle}>
      <Slider isOn={isOn} />
    </SwitchContainer>
  )
}

export default Switch
