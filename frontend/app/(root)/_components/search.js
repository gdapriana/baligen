'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {SearchIcon} from 'lucide-react';
import {cn, iconClass} from '@/lib/utils';
import { getDestinations } from "../_utils/get-destinations";
import { Loading } from "@/components/ui/loading";
import { getCultures } from "../_utils/get-cultures";
import Link from "next/link";

export const Search = () => {
  const [open, setOpen] = useState(false)

  const [destinations, setDestinations] = useState()
  const [cultures, setCultures] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDestinations(setLoading, setDestinations).then()
    getCultures(setLoading, setCultures).then()
  }, [])

  if (loading) return (
    <div className="absolute w-full h-screen bg-white z-[99999]">Loading...</div>
  )

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(!open)} className="gap-1 hidden md:flex ms-auto text-muted-foreground"><SearchIcon className={iconClass} />Search...</Button>
      <SearchIcon onClick={() => setOpen(!open)} className={cn('md:hidden ms-auto w-6 h-6 text-muted-foreground')} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Destinations">
            {
              destinations?.map((item) => {
                return (
                  <CommandItem key={item.id}>
                    <Link href={`/destinations/${item.slug}`}>{item.name}</Link>
                  </CommandItem>
                )
              })
            }
          </CommandGroup>
          <CommandGroup heading="Cultures">
            {
              cultures?.map((item) => {
                return (
                  <CommandItem key={item.id}>
                    <Link href={`/cultures/${item.slug}`}>{item.name}</Link>
                  </CommandItem>
                )
              })
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
