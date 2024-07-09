'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const metadata = {
  text: {
    title: process.env.NEXT_PUBLIC_APP,
    subtitle: 'Your Gateway to Bali Enchanting Culture and Breathtaking Landscapes',
    button: {
      text: 'Explore Now'
    }
  },
  images: [
    { link: 'https://plus.unsplash.com/premium_photo-1668883189152-d771c402c385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { link: 'https://images.unsplash.com/photo-1567329916012-26f1f39f04c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { link: 'https://images.unsplash.com/photo-1567329916012-26f1f39f04c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ]
}

export const Hero = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  return (
    <main className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 p-4 aspect-square md:aspect-[16/5]">
        <div className="w-full md:w-5/12 md:h-full h-auto flex justify-start items-center">
          <header className="flex flex-col gap-2 justify-start items-start">
            <h1 className="text-3xl font-bold">{metadata.text.title}</h1>
            <p className="text-base font-medium text-muted-foreground">{metadata.text.subtitle}</p>
            <Button className="mt-4">{metadata.text.button.text}</Button>
          </header>
        </div>
        <div className="w-full md:w-7/12 md:h-full aspect-video md:aspect-auto flex gap-2">
          {metadata.images.map((item, index: number) => {
            return (
              <article style={{ backgroundImage: `url(${item.link})`, backgroundSize: 'cover', backgroundPosition: 'center'}} key={index} onMouseEnter={() => setActiveImageIndex(index)} className={cn('h-full transition-all ease-in-out duration-700', activeImageIndex === index ? 'w-1/2 rounded-2xl' : 'w-1/4 grayscale')}></article>
            )
          })}
        </div>
      </div>
    </main>
  )
}