'use client'
import { Button } from "@/components/ui/button";
import { iconsSize } from "@/lib/constants";
import { DestinationProps } from "@/lib/types";
import { Layers2, MapIcon, MapPin, WalletMinimal } from "lucide-react";

export const Header = ({ destination }: { destination: DestinationProps | null | undefined } ) => {
  return (
    <header className="flex flex-col justify-start items-stretch gap-1">
      <h1 className="font-bold text-xl md:text-2xl">{destination?.name}</h1>
      <p className="text-muted-foreground">{destination?.description}</p>
      <div className="grid grid-cols-[auto_1fr] gap-4 mt-4">
        <WalletMinimal className={iconsSize(5)} />
        {destination?.price === 0 ? (
          <p className="font-medium">Free Entry</p>
        ) : (
          <p className="font-medium">Rp. {destination?.price}</p>
        )}
        
        <MapPin className={iconsSize(5)} />
        <p className="font-medium">{destination?.address}</p>

        <div className="col-span-2 flex mt-4 md:hidden justify-start items-center gap-1">
          <Button size="sm" variant="secondary" className="gap-1">
            <MapIcon className={iconsSize(4)} /> {destination?.district.name}
          </Button>
          <Button size="sm" variant="secondary" className="gap-1">
            <Layers2 className={iconsSize(4)} /> {destination?.category.name}
          </Button>
        </div>
      </div>
    </header>
  )
} 