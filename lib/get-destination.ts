import { Dispatch, SetStateAction } from "react"
import { DestinationProps } from "./types"

export const getDestinations = async (take: number | undefined, setLoading: Dispatch<SetStateAction<boolean>>) => {
  setLoading(true)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations${take && `?take=${take}`}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.destinations
  } catch (error: unknown) {
    throw new Error(`Failed ${error}`)
  } finally {
    setLoading(false)
  }
}

export const getDestination = async (setLoading: Dispatch<SetStateAction<boolean>>, slug: string) => {
  setLoading(true)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations/${slug}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.destination
  } catch (error: unknown) {
    throw new Error(`Failed ${error}`)
  } finally {
    setLoading(false)
  }
}

export const getFavoritedUser = (setLoading: Dispatch<SetStateAction<boolean>>, destination: DestinationProps | undefined | null, email: string | null | undefined) => {
  setLoading(true)

  if (destination) {
    for (let index = 0; index < destination.favoritedByUsers.length; index++) {
      if (destination.favoritedByUsers[index].userEmail === email) {
        setLoading(false)
        return true
      }
    }
  }
  setLoading(false)
  return false
}