'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon, RocketIcon } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { useInterval } from 'usehooks-ts'
import { motion } from "framer-motion"
import Link from "next/link"
import { iconsSize } from "@/lib/constants"

const metadata = {
  text: {
    title: process.env.NEXT_PUBLIC_APP,
    subtitle: 'Your Gateway to Bali Enchanting Culture and Breathtaking Landscapes',
    button: {
      text: 'Explore Now'
    }
  },
  images: [
    { 
      title: 'Destinations',
      description: 'Explore Bali Destinations with one click 😇',
      link: 'https://plus.unsplash.com/premium_photo-1668883189152-d771c402c385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      button: {
        text: 'Explore',
        icon: RocketIcon as LucideIcon,
        route: '/destinations'
      }
    },
    { 
      title: 'Cultures',
      description: 'Explore Bali Cultures with one click 💃',
      link: 'https://images.unsplash.com/photo-1552301726-570d51466ae2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      button: {
        text: 'Explore',
        icon: RocketIcon as LucideIcon,
        route: '/cultures'
      }
    },
    { 
      title: 'Stories',
      description: 'Check others with beautiful stories ⛱️',
      link: 'https://images.unsplash.com/photo-1567329916012-26f1f39f04c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      button: {
        text: 'Explore',
        icon: RocketIcon as LucideIcon,
        route: '/stories'
      }
    },
  ]
}

const slideInterval = (activeIndex: number, setActiveIndex: Dispatch<SetStateAction<number>>) => {
  if (activeIndex < (metadata.images.length - 1)) {
    setActiveIndex(activeIndex + 1)
  } else {
    setActiveIndex(0)
  }
}

export const Hero = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [mouseEnterSlide, setMouseEnterSlide] = useState<boolean>(false)

  useInterval(() => {
    if (!mouseEnterSlide) {
      slideInterval(activeImageIndex, setActiveImageIndex)
    }
  }, 5000)

  return (
    <main className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 p-4 aspect-square md:aspect-[16/5]">
        <div className="w-full md:w-5/12 md:h-full h-auto flex justify-start items-center">
          <header className="flex flex-col gap-2 justify-start items-start">
            <h1 className="text-3xl font-bold">{metadata.text.title}</h1>
            <p className="text-base font-medium text-muted-foreground">{metadata.text.subtitle}</p>
            <Button size="lg" className="mt-4">{metadata.text.button.text}</Button>
          </header>
        </div>
        <div className="w-full md:w-7/12 md:h-full aspect-video md:aspect-auto flex gap-2">
          {metadata.images.map((item, index: number) => {
            return (
              <article 
                style={{ backgroundImage: `url(${item.link})`, backgroundPosition: 'center'}} 
                key={index} 
                onMouseEnter={() => {
                  setActiveImageIndex(index)
                  setMouseEnterSlide(true)
                }} 
                onMouseLeave={() => setMouseEnterSlide(false)}
                className={cn('h-full overflow-hidden flex flex-col justify-end items-stretch bg-cover transition-all ease-in-out duration-700', activeImageIndex === index ? 'w-1/2 border shadow rounded-2xl' : 'w-1/4 grayscale')
              }>
                {index === activeImageIndex && (
                  <motion.div initial={{y: 400}} exit={{ y: 400, opacity: 0 }} animate={{y: 0}} transition={{ ease: 'easeOut', delay: .2, duration: 1 }} className="bg-white dark:bg-stone-950 p-3 flex flex-col justify-start items-stretch">
                    <h1 className="font-bold text-base md:text-lg">{item.title}</h1>
                    <p className="font-medium text-sm md:text-base text-muted-foreground">{item.description}</p>
                    <Button className="mt-4 gap-2" asChild>
                      <Link href={item.button.route}>{item.button.text} <item.button.icon className={iconsSize(4)} /></Link>
                    </Button>
                  </motion.div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}