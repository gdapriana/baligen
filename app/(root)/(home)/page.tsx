'use client'

import { ScrollContext } from "@/lib/scroll-provider";
import { useContext, useState } from "react";
import { Hero } from "@/app/(root)/(home)/_components/hero";
import { Destinations } from "./_components/destinations";


export default function Home() {
  const { scrolled, setScrolled } = useContext(ScrollContext)
  const scrollHandle = (event: any) => setScrolled(event.target.scrollTop > 0)

  return (
    <main onScrollCapture={ scrollHandle } className="basis-0 grow overflow-auto p-4">
      <Hero />
      <Destinations />
    </main>
  )
}
