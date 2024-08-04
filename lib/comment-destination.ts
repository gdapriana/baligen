import { Dispatch, SetStateAction } from "react"

export const postComment = async (body: string, slug: string | undefined, setLoading: Dispatch<SetStateAction<boolean>>) => {
  setLoading(true)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations/${slug}/comment`, {
      method: 'POST',
      body: JSON.stringify({ body })
    })
    if (response.ok) return response.json()
  } catch (error: unknown) {
    throw new Error(`Error: ${error}`)
  } finally {
    setLoading(false)
  }
}

export const deleteComment = async (id: string, slug: string, setLoading: Dispatch<SetStateAction<boolean>>) => {
  setLoading(true)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/destinations/${slug}/comment`, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
    if (response.ok) return response.json()
  } catch (error: unknown) {
    throw new Error(`Error: ${error}`)
  } finally {
    setLoading(false)
  }
}