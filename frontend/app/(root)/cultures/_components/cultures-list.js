'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn, iconClass } from "@/lib/utils"
import { Bookmark, CalendarHeart, Layers2, MapPin, MessageCircle } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export const CulturesList = ({ cultures }) => {
  const [listCount, setListCount] = useState(5)
  const culturesLength = cultures?.length

  return (

    <main className="flex justify-start flex-col items-stretch">
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-xl w-full text-center">Cultures List</h1>
      </header>
      <div className="flex flex-col justify-start items-stretch">
        {cultures?.slice(0, listCount).map((item) => {
          return (
            <div className="py-4 border-b gap-4 flex flex-col justify-start items-stretch">
              <header className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <Avatar>
                    <AvatarFallback>B</AvatarFallback>
                    <AvatarImage src="/images/logo.png" />
                  </Avatar>
                  <p>By <span className="font-semibold">{process.env.NEXT_PUBLIC_APP}</span></p>
                </div>
                <p><CalendarHeart className={cn('inline', iconClass)} /> {moment(item.createdAt).fromNow()}</p>
              </header>
              <div className="flex justify-center items-start">
                <div className="flex flex-col justify-start items-stretch basis-0 grow">
                  <h1 className="font-bold text-lg">{item.name}</h1>
                  <p className="text-muted-foreground line-clamp-3">{item.description}</p>
                </div>
                <Image alt="cover" width={1920} height={1080} className="aspect-[4/4] hidden md:block w-32 object-cover" src={item.cover || "/images/hero.jpg"} />
              </div>
              <footer className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  {item.district === null || item.district === undefined ? (
                    <Button variant="outline" className="gap-1"><MapPin className={iconClass} /> General Culture</Button>
                  ) : (
                    <Button variant="outline" className="gap-1"><MapPin className={iconClass} /> {item.district.name}</Button>
                  )}
                </div>
                <div className="flex justify-center gap-1 items-center">
                  <div className="md:flex hidden justify-center items-center gap-1">
                    <Button variant="ghost" className="gap-1"><MessageCircle className={iconClass}/>{item._count.commentedByUsers}</Button>
                    <Button variant="ghost" className="gap-1"><Bookmark className={iconClass}/>{item._count.favoritedByUsers}</Button>
                  </div>
                  <Button variant="default" asChild>
                    <Link href={`/cultures/${item.slug}`}>Explore</Link>
                  </Button>
                </div>
              </footer>
            </div>
          )
        })}

        {listCount < culturesLength && (
          <Button variant="outline" onClick={() => setListCount(listCount + 3)} className="mt-12 w-full">Load More</Button>
        )}
      </div>
    </main>
  )
}
