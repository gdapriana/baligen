'use client'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { iconsSize } from "@/lib/constants"
import { getDestinations } from "@/lib/get-destination"
import { LoadingContext } from "@/lib/loading-provider"
import { DestinationProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Heart, LucideIcon, LucideRocket, MapPinnedIcon, MessageCircleMore } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion" 

const metadata = {
  title: 'Popular Destinations',
  subtitle: 'Much places suits your mood, Explore somewhere interesting and enjoy the vibes',
  destinationsTake: 3,
  button: {
    icon: LucideRocket as LucideIcon,
    text: 'More Destinations',
    route: '/destinations'
  },
  logo: '/images/logo3.png',
  card: {
    icon: MapPinnedIcon as LucideIcon,
  }
}

export const Destinations = () => {
  const { loading, setLoading } = useContext(LoadingContext)
  const [destinations, setDestinations] = useState<DestinationProps[]>()

  useEffect(() => {
    async function setItem() {setDestinations(await getDestinations(metadata.destinationsTake, setLoading))}
    setItem()
  }, [setLoading])

  return (
    <main className="w-full flex justify-center mt-20 items-center">
      <div className="w-full max-w-6xl gap-8 justify-start items-stretch lg:justify-center lg:items-center p-4 flex flex-col lg:flex-row">
        <header className="flex lg:max-w-xs flex-col justify-start items-center">
          <Image src={metadata.logo} alt="logo" width={1000} height={1000} className="w-36 lg:w-48" />
          <h1 className="font-bold text-lg md:text-xl">{metadata.title}</h1>
          <p className="font-medium text-center text-sm lg:text-base">{metadata.subtitle}</p>
          <Button asChild className="mt-6 hidden md:flex gap-2">
            <Link href={metadata.button.route}>{metadata.button.text} <metadata.button.icon className={iconsSize(4)} /></Link>
          </Button>
        </header>
        <motion.div className="grow hidden lg:gap-4 gap-2 md:flex basis-0 overflow-auto">
          {loading && (
            <main>Loading...</main>
          )}

          {!loading && (
            destinations?.map((item: DestinationProps, index: number) => {
              return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1, duration: .5 }} className="" key={index}>
                  <Link href={`/destinations/${item.slug}`} className="md:flex-1 border rounded-xl overflow-hidden flex flex-col justify-start items-stretch">
                    <Image src={item.cover || ""} alt={item.name} width={1920} height={1080} className="w-full aspect-video object-cover" />
                    <div className="md:p-4 p-2 flex flex-col justify-start items-stretch gap-1">
                      <h1 className="font-bold line-clamp-1 text-base"><metadata.card.icon className={cn('inline-block me-1', iconsSize(4))} />{item.name}</h1>
                      <p className="line-clamp-3 font-medium text-sm">{item.description}</p>
                      <div className="flex justify-center mt-2 items-center gap-1 ms-auto">
                        <Button size="sm" variant="outline" className="gap-1"><Heart className={iconsSize(4)} />{item._count.favoritedByUsers}</Button>
                        <Button size="sm" variant="outline" className="gap-1"><MessageCircleMore className={iconsSize(4)} />{item._count.commentedByUsers}</Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })
          )}
        </motion.div>
      </div>
    </main>
  )
}