'use client'

import { Brand } from "@/components/ui/brand"
import { Button } from "@/components/ui/button"
import { routes } from "@/lib/constants"
import { ScrollContext } from "@/lib/scroll-provider"
import { routesProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useContext } from "react"

const metadata = {
  brand: {
    text: process.env.NEXT_PUBLIC_APP as string,
    route: '/'
  },
  navigations: routes as routesProps[]
}

export const Header = () => {
  const { scrolled } = useContext(ScrollContext)
  const { status, data } = useSession()

  return (
    <header className={cn('flex justify-center items-center', scrolled && "border-b")}>
      <div className="w-full max-w-6xl p-4 flex justify-between items-center gap-4">
        <Brand />

        <div className="md:flex hidden">
          {metadata.navigations.map((route: routesProps, index: number) => {
            return (
              <Button key={index} variant='ghost' asChild>
                <Link href={route.route}>{route.name}</Link>
              </Button>
            )
          })}
        </div>
      </div>
    </header>
  )
}