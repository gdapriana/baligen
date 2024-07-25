import { Dispatch, SetStateAction } from "react";
import { StoryProps } from "./types";

export const getStory = async (setLoading: Dispatch<SetStateAction<boolean>>, setStory: Dispatch<SetStateAction<StoryProps | undefined | null>>, slug: string) => {
  setLoading(true)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/stories/${slug}`)
    if (response.ok) {
      const story = await response.json()
      setStory(story.story)
    } else {
      setStory(null)
    }

  } catch (error) {
    return error
  }
  setLoading(false)
}