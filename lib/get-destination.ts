import { Dispatch, SetStateAction } from "react"

export const getDestinations = async (take: number | undefined, setLoading: Dispatch<SetStateAction<boolean>>) => {
  setLoading(true)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations${take && `?take=${take}`}`)
    if (!res.ok) throw new Error('Failed to fetch data')
    const data = await res.json()
    setLoading(false)
    return data.destinations
  } catch (error: unknown) {
    throw new Error(`Failed ${error}`)
  }
}

export const getDestination = async (setLoading: Dispatch<SetStateAction<boolean>>, slug: string) => {
  setLoading(true)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations/${slug}`)
    if (!res.ok) return null
    const data = await res.json()
    setLoading(false)
    return data.destination
  } catch (error: unknown) {
    throw new Error(`Failed ${error}`)
  }
}