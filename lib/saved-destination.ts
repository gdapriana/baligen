import { Dispatch, SetStateAction } from "react";

export const SavedDestination = async (setLoading: Dispatch<SetStateAction<boolean>>, slug: string | undefined | null) => {
  setLoading(true)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations/${slug}/save`, {
      method: 'POST'
    })
    if (response.ok) return response.json()
  } catch (error: unknown) {
    throw new Error(`error: ${error}`)
  } finally {
    setLoading(false)
  }
}

export const UnsavedDestination = async (setLoading: Dispatch<SetStateAction<boolean>>, slug: string | undefined | null) => {
  setLoading(true)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations/${slug}/save`, {
      method: 'DELETE'
    })
    if (response.ok) return response.json()
  } catch (error: unknown) {
    throw new Error(`error: ${error}`)
  } finally {
    setLoading(false)
  }
}