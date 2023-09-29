import styled from 'styled-components'
import icon from '@/assets/arrows-exchange-v.svg'

interface ExchangeProp {
  fromCoin: string
  setFromCoin: React.Dispatch<React.SetStateAction<string>>
  toCoin: string
  setToCoin: React.Dispatch<React.SetStateAction<string>>
}

const Div = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: #1f1f1f;
  padding: .5rem .55rem;
  border-radius: 99rem;
  transition: all 250ms;
  cursor: pointer;

  &:hover {
    background-color: #775eff;
  }
`

export default function ExchangeButton ({ fromCoin, setFromCoin, toCoin, setToCoin } : ExchangeProp) {
  
  const handleAction = () => {
    const newToCoin = fromCoin
    setFromCoin(toCoin)
    setToCoin(newToCoin)
  }

  return (
    <Div onClick={handleAction}>
      <img src={icon.src} />
    </Div>
  )
}