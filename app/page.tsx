'use client'

import { useState, useEffect } from 'react';
import styled from 'styled-components'
import MainTitle from '@/components/MainTitle';
import CurrencySelect from '@/components/CurrencySelect'
import ExchangeButton from '@/components/ExchangeButton';

type ResponseRate = {
  rate: number[]
  result: number
}

const MainContainer = styled.main`
  padding: 1rem 8px;

  @media (min-width: 1025px) {
    padding: 1rem 8rem;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`
const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  background-color: #eeebff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 3px 8px 10px rgb(0,0,0,0.25)
`
const Title = styled.h4`
  margin: 0;
`
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
  margin-top: 0.5rem;
`
const Input = styled.input`
  width: 80%;
  text-align: end;
  outline: none;
  border-radius: .3rem;
  border: solid 2px #42348e91;
  padding: .1rem .5rem;

  @media (min-width: 1025px) {
    width: 20%;
  }
`
const Span = styled.span`
  width: 80%;
  text-align: end;
`

export default function Home() {

  const [fromValue, setFromValue] = useState(1)
  const [toValue, setToValue] = useState(0)
  const [fromCoin, setFromCoin] = useState("placeholder")
  const [toCoin, setToCoin] = useState("placeholder")
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const convert = async () => {
    // Se obtiene la tasa de cambio y resultado de calcular la conversion entre las dos monedas
    const response = await fetch('/rate', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ 
        fromCoin, 
        toCoin, 
        value: fromValue
      })
    })

    if (!response.ok) {
      throw new Error('Fetching /rate Error')
    }
    const data = await response.json()
    const { rate, result }: ResponseRate = data
    setToValue(result)
  }

  useEffect(() => {
    if (toCoin !== 'placeholder' && fromCoin !== 'placeholder') {
      convert()
    }
  }, [fromCoin, toCoin])

  useEffect(() => {
    // Retardo al escribir en el <input> antes de calcular el cambio.
    clearTimeout(timeoutId)
    if (toCoin !== 'placeholder' && fromCoin !== 'placeholder') {
      const id = setTimeout(() => {
        convert()
      }, 500)
      setTimeoutId(id)
    }
  }, [fromValue])
  
   return (
    <>
    <MainTitle/>
    <MainContainer>
      <Container>
        <CurrencyContainer>
          <Title id='25'>
            From:
          </Title>
          <RowDiv>
            <CurrencySelect change={setFromCoin} value={fromCoin}/>
            <Input type='number' defaultValue={fromValue} onChange={(e: any) => setFromValue(e.target.value)}/>
          </RowDiv>
        </CurrencyContainer>

        <ExchangeButton fromCoin={fromCoin} setFromCoin={setFromCoin} toCoin={toCoin} setToCoin={setToCoin}/>

        <CurrencyContainer>
          <Title>
            To:
          </Title>
          <RowDiv>
            <CurrencySelect change={setToCoin} value={toCoin} />
            <Span>{toValue}</Span>
          </RowDiv>
        </CurrencyContainer>
      </Container>
    </MainContainer>
    </>
  )
}
