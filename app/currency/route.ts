import { NextResponse } from "next/server"

export async function GET (req: Request) {
  const API_KEY = process.env.API_KEY
  const response = await fetch(`http://api.exchangeratesapi.io/v1/symbols?access_key=${API_KEY}`, {
    method: 'GET',
    next: { revalidate: 600}
  })
  if (!response.ok) {
    throw new Error('Ha ocurrido un error')
  }
  const data = await response.json()
   return NextResponse.json({ data })
}