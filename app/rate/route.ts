import { NextResponse } from "next/server"

type BodyRequest = {
  fromCoin: string
  toCoin: string
  value: number
}

export async function POST (req: Request) {

  const API_KEY = process.env.API_KEY
  const body = await req.json()
  const { fromCoin, toCoin, value } : BodyRequest = body

  const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&base=EUR&symbols=${fromCoin},${toCoin}`, {
    method: 'GET',
    cache: 'force-cache',
  })

  if (!response.ok) {
    console.log(body)
    throw new Error('Response Fetch Error' )
  }

  const data = await response.json()
  let rate, result

  if (data.success) {
    rate = [1/data.rates[fromCoin], 1/data.rates[toCoin]]
    result = rate[0]/rate[1]*value
  }

  return NextResponse.json({ rate, result })
}