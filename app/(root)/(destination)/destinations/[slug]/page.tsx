'use client'

import { Loading } from "@/components/ui/loading"
import { getDestination } from "@/lib/get-destination"
import { LoadingContext } from "@/lib/loading-provider"
import { DestinationProps } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bookmark, MapPinned, MessageCircleMore } from "lucide-react"
import { iconsSize } from "@/lib/constants"
import { ScrollContext } from "@/lib/scroll-provider"
import { Cover } from "./_components/cover"
import { Header } from "./_components/header"
import { Actions } from "./_components/action"
import { Images } from "./_components/images"
import { Comment } from "./_components/comment"

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const { loading, setLoading } = useContext(LoadingContext)
  const { setScrolled } = useContext(ScrollContext)
  const [destination, setDestination] = useState<DestinationProps | null>()
  const router = useRouter()
  const scrollHandle = (event: any) => setScrolled(event.target.scrollTop > 0)

  useEffect(() => {
    async function setItem() {setDestination(await getDestination(setLoading, params.slug))}
    setItem()
  }, [setLoading, params.slug])

  if (loading) return <Loading />
  if (destination === null) router.push('/')
  return (
    <main className="w-full flex flex-col grow basis-0 overflow-auto justify-start items-center" onScrollCapture={ scrollHandle }>
      <div className="w-full gap-8 flex flex-col justify-start items-stretch max-w-6xl p-4">
        <Cover destination={destination} />
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="grow basis-0 gap-4 flex justify-start items-stretch flex-col">
            <Header destination={destination} />
            <Actions destination={destination} />
            <Images destination={destination} />
            <Comment destination={destination} />
          </div>
          <div className="md:w-1/3">P</div>
        </div>
      </div>
    </main>
  )
}