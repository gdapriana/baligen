'use client'

import { Button } from "@/components/ui/button"
import { iconsSize } from "@/lib/constants"
import { getDestinations } from "@/lib/get-destination"
import { LoadingContext } from "@/lib/loading-provider"
import { DestinationProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Bookmark, BookMarked, LucideIcon, MapPinned, MessageCircleIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

const metadata = {
  header: {
    text: 'Popular Destinations',
    icon: MapPinned as LucideIcon
  },
  destinations: {
    take: 5
  }
}

export const PopularDestinations = ({ destinations }: { destinations: DestinationProps[] | undefined }) => {
  return (
    <main className="flex flex-col justify-start items-stretch gap-4">
      <header>
        <h1 className="font-bold text-lg"><metadata.header.icon className="inline-block" /> {metadata.header.text}</h1>
      </header>
      <div className="flex flex-col justify-start items-stretch gap-2">
        {destinations?.map((destination: DestinationProps, index: number) => {
          return (
            <Link href={`/destinations/${destination.slug}`} key={index} className="grid gap-2 rounded-lg hover:bg-secondary p-2 grid-cols-[auto_1fr] grid-rows-[auto_auto]">
              <Image src={destination.cover || ''} alt="cover" className="aspect-square row-span-2 w-20 rounded-md object-cover" width={1000} height={1000} />
              <div className="flex flex-col justify-start items-start">
                <h1 className="font-bold">{destination.name}</h1>
                <p className="line-clamp-1 text-sm">{destination.description}</p>
              </div>
              <div className="flex justify-end items-center text-sm gap-2">
                <p><Bookmark className={ cn('inline-block', iconsSize(4))} /> {destination?._count.favoritedByUsers}</p>
                <p><MessageCircleIcon className={ cn('inline-block', iconsSize(4))} /> {destination?._count.commentedByUsers}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}