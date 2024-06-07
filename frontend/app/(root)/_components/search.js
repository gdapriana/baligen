'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {SearchIcon} from 'lucide-react';
import {cn, iconClass} from '@/lib/utils';

export const Search = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(!open)} className="gap-1 hidden md:flex ms-auto text-muted-foreground"><SearchIcon className={iconClass} />Search...</Button>
      <SearchIcon onClick={() => setOpen(!open)} className={cn('md:hidden ms-auto w-6 h-6 text-muted-foreground')} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Destinations">
          </CommandGroup>
          <CommandGroup heading="Cultures">
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
