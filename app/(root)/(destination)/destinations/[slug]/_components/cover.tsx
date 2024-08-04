'use client'
import { DestinationProps } from "@/lib/types"
import { motion } from "framer-motion"
import Image from "next/image"

export const Cover = ({ destination }: { destination: DestinationProps | undefined | null }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 3, ease: "anticipate" }} className="">
      <Image src={destination?.cover || ''} width={1920} height={1080} className="object-cover rounded-3xl aspect-video w-full" alt={destination?.name || 'cover'} />
    </motion.div>
  )
}