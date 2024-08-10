'use client'

import { Button } from "@/components/ui/button"
import { iconsSize } from "@/lib/constants"
import { Bookmark, LucideIcon, TreePalm } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

const metadata: {tabs: {name: string; icon: LucideIcon, id: 'stories' | 'favDestinations' | 'favStories' | 'favCultures'}[]} = {
  tabs: [
    {name: 'My Stories', icon: TreePalm as LucideIcon, id: 'stories'},
    {name: 'Favorited Destinations', icon: Bookmark as LucideIcon, id: 'favDestinations'},
    {name: 'Favorited Stories', icon: Bookmark as LucideIcon, id: 'favStories'},
    {name: 'Favorited Cultures', icon: Bookmark as LucideIcon, id: 'favCultures'},
  ]
}

export const Tabs = ({ activeTab, setActiveTab }: { activeTab: 'stories' | 'favStories' | 'favDestinations' | 'favCultures'; setActiveTab: Dispatch<SetStateAction<'stories' | 'favStories' | 'favDestinations' | 'favCultures'>> }) => {
  return (
    <main className="flex justify-center items-center gap-2 flex-wrap md:flex-nowrap">
      {metadata.tabs.map((item: any, index: number) => {
        return (
          <Button onClick={() => setActiveTab(item.id)} variant={activeTab === item.id ? 'default' : 'outline'} key={index} className="w-full gap-2">
            <item.icon className={iconsSize(4)} />{item.name}
          </Button>
        )
      })}
    </main>
  )
}