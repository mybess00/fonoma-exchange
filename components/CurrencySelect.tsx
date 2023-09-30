'use client'

import styled from 'styled-components'
import { useRef, useState, useEffect } from 'react'
import useSWR from 'swr'

type CurrencyProp = {
  change: React.Dispatch<React.SetStateAction<string>>
  defaultValue?: string
  value: string
}

const Select = styled.select`
  width: 37%;
  background: transparent;
  border: none;
  outline: none;
  @media (min-width: 1025px) {
    width: 25%;
  }
`
const fetchCurrency = async (key: any) => {
  // Obtener listado de monedas disponibles
  const response = await fetch(key, { method: 'GET' })
  if (!response.ok) {
    alert('Ha ocurrido un error')
    throw new Error('Ha ocurrido un error')
  }
  const data = await response.json()
  if (data.data.success) {
    return data.data.symbols
  }
  throw new Error(data.error)
} 

export default function CurrencySelect ({ change, defaultValue, value }: CurrencyProp) {

  const selectRef = useRef<HTMLSelectElement | null>(null)
  const { data, error, isLoading } = useSWR('/currency', fetchCurrency)
  const [prevOption, setPrevOption] = useState<HTMLOptionElement>()

  const handleSelected = (e: any) => {
    // Cambia el contenido del <option> seleccionado a solo las siglas de la moneda
    const selectItem: HTMLSelectElement = e.target    
    const optionSelected = selectItem.selectedOptions.item(0)
    if (optionSelected) {
      const data = optionSelected.dataset
      if (data.value) {
        optionSelected.innerHTML = data.value
        if (prevOption && data.name) {
          const prevData = prevOption.dataset
          prevOption.innerHTML = `${prevData.value}: ${prevData.name}`
        }
      }
      setPrevOption(optionSelected)
    }
    change(selectItem.value)
  }

  useEffect(() => {
    if (selectRef.current) {
      if (selectRef.current.selectedOptions.item(0) !== prevOption) {
        handleSelected({ target: selectRef.current})
      }
    }
  }, [value])

  return (
    <div>
      <Select value={value ? value : 'placeholder'} onChange={handleSelected} ref={selectRef}>
        <option value='placeholder' disabled> Select a currency</option>
        { data && !isLoading && !error ? Object.entries(data).map(([key, value], index) => {
          return  <option key={index} data-value={key} data-name={value} value={key}>{`${key}: ${value}`}</option>
        }) : ''}
      </Select>
    </div>
  )
}