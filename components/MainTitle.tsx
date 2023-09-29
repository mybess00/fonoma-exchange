import styled from 'styled-components'
import Image from 'next/image'
import back from '@/assets/wickedbackground.svg'

const Container = styled.div`
  position: relative;
`
const Title = styled.h1`
  z-index: 1;
  position: relative;
  margin: 0;
  padding: 2rem .35rem;
  text-align: center;
  color: white;
`
const Background = styled.img`
  position: absolute;
  height: 100vh;
  top: 0;
  @media (min-width:1025px) {
    height: auto;
  }
`

export default function MainTitle () {
  return (
    <Container>
      <Title>Fonoma Exchange Rate</Title>
      <Background src={back.src} alt='background'/>
    </Container>
  )
}