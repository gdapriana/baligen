'use client'
import { Button } from "@/components/ui/button";
import { iconsSize } from "@/lib/constants";
import { DestinationProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion'
import { Heart, LucideIcon, MapPinnedIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const metadata = {
  card: {
    icon: MapPinnedIcon as LucideIcon,
  }
}

export const DestiantionCard = ({ destination, index }: { destination: DestinationProps; index: number }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1, duration: .5 }} className="w-64" key={index}>
      <Link href={`/destinations/${destination.slug}`} className="border rounded-xl overflow-hidden flex flex-col justify-start items-stretch">
        <Image src={destination.cover || ""} alt={destination.name} width={1920} height={1080} className="w-full aspect-video object-cover" />
        <div className="md:p-4 p-2 flex flex-col justify-start items-stretch gap-1">
          <h1 className="font-bold line-clamp-1 text-base"><metadata.card.icon className={cn('inline-block me-1', iconsSize(4))} />{destination.name}</h1>
          <p className="line-clamp-3 font-medium text-sm">{destination.description}</p>
          <div className="flex justify-center mt-2 items-center gap-1 ms-auto">
            <Button size="sm" variant="outline" className="gap-1"><Heart className={iconsSize(4)} />{destination._count.favoritedByUsers}</Button>
            <Button size="sm" variant="outline" className="gap-1"><MessageCircleMore className={iconsSize(4)} />{destination._count.commentedByUsers}</Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}