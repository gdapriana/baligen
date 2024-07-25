'use client'

import { Loading } from "@/components/ui/loading"
import { getStory } from "@/lib/get-story"
import { LoadingContext } from "@/lib/loading-provider"
import { StoryProps } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function StoryPage({ params }: { params: { slug: string }}) {
  const router = useRouter()
  const { loading, setLoading } = useContext(LoadingContext)
  const [ story, setStory ] = useState<StoryProps | null>()

  useEffect(() => {
    getStory(setLoading, setStory, params.slug)
  }, [setLoading, setStory, params.slug])

  if (loading) return <Loading />
  if (story === null) router.push('/')
  return (
    <div className="w-full flex justify-center items-center">

    </div>
  )
}