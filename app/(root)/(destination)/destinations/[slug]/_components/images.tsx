import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { iconsSize } from "@/lib/constants";
import { DestinationProps, ImageProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ImageOff, LucideIcon } from "lucide-react";
import Image from "next/image";


const metadata = { 
  noImage: {
    icon: ImageOff as LucideIcon,
    text: 'No Additional Images Available'
  }
}

export const Images = ({ destination }: { destination: DestinationProps | null | undefined }) => {
  if (destination?.images.length === 0) {
    return (
      <div className="p-4 flex justify-center items-center">
        <metadata.noImage.icon className={ cn('me-1', iconsSize(4))} />
        {metadata.noImage.text}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {destination?.images.map((image: ImageProps) => {
        return (
          <Dialog key={image.id}>
            <DialogTrigger>
              <Image src={image.uri || ""} alt={image.destination?.name || ""} width={1920} height={1080} className="aspect-video w-full rounded-lg" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                {image.destination?.name} image
              </DialogHeader>
              <Image src={image.uri || ""} alt={image.destination?.name || ""} width={1920} height={1080} className="aspect-video w-full rounded-lg" />
            </DialogContent>
          </Dialog>
        )
      })}
    </div>
  )
}