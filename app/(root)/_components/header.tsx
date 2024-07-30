'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brand } from "@/components/ui/brand"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/dark-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { routes } from "@/lib/constants"
import { ScrollContext } from "@/lib/scroll-provider"
import { routesProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { LogIn, LucideIcon, Search } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useContext } from "react"
import { motion } from 'framer-motion'
import { ProfileDropdown } from "./profile-dropdown"

const metadata = {
  brand: {
    text: process.env.NEXT_PUBLIC_APP as string,
    route: '/'
  },
  navigations: routes as routesProps[],
  signIn: {
    text: 'Sign in',
    route: '/signin',
    icon: LogIn as LucideIcon
  }
}

export const Header = () => {
  const { scrolled } = useContext(ScrollContext)
  const { status, data } = useSession()

  return (
    <header className={cn('flex justify-center sticky z-40 bg-white top-0 items-center', scrolled && "border-b")}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: {duration: 0.8, ease: 'easeOut'} }} className="w-full max-w-6xl p-4 flex justify-between items-center gap-2">
        <Brand />

        <div className="md:flex ms-auto hidden">
          {metadata.navigations.map((route: routesProps, index: number) => {
            return (
              <Button key={index} variant='ghost' asChild>
                <Link href={route.route}>{route.name}</Link>
              </Button>
            )
          })}
        </div>

        <Button className="ms-auto md:ms-0" size="icon" variant="ghost">
          <Search className="w-4 h-4" />
        </Button>

        <ModeToggle />

        {status === 'loading' && (<Skeleton><Button variant='ghost'>Loading...</Button></Skeleton>)}
        {status === 'unauthenticated' && (<Button className="gap-2" variant="secondary" asChild><Link href={metadata.signIn.route}>< metadata.signIn.icon className={'w-4 h-4'}/>{metadata.signIn.text}</Link></Button>)}
        {status === 'authenticated' && data && (
          <ProfileDropdown data={data} />
        )}
      </motion.div>
    </header>
  )
}