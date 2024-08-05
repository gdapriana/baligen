'use client'
import { Button } from "@/components/ui/button";
import { iconsSize } from "@/lib/constants";
import { DestinationProps } from "@/lib/types";
import { Layers2, MapIcon, MapPinned, MessageCircleMore } from "lucide-react";
import { SaveDestination } from "../_actions/save-unsave-destination";

export const Actions = ({ destination }: { destination: DestinationProps | null | undefined }) => {
  return (
    <div className="py-4 border-y flex gap-2 justify-between items-center">
      <Button size="sm" className="gap-1">
        <MapPinned className={iconsSize(4)} />
        Open in Map
      </Button>
        <div className="col-span-2 md:flex hidden justify-start items-center gap-2">
          <Button size="sm" variant="secondary" className="gap-1">
            <MapIcon className={iconsSize(4)} /> {destination?.district.name}
          </Button>
          <Button size="sm" variant="secondary" className="gap-1">
            <Layers2 className={iconsSize(4)} /> {destination?.category.name}
          </Button>
        </div>
      <div className="ms-auto flex gap-1">
        <SaveDestination destination={destination} />
        <Button variant="outline" className="gap-1">
          <MessageCircleMore className={iconsSize(4)} /> {destination?._count.commentedByUsers}
        </Button>
      </div>
    </div>
  )
}