'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { iconsSize } from "@/lib/constants"
import { getFavoritedUser } from "@/lib/get-destination"
import { LoadingContext } from "@/lib/loading-provider"
import { SavedDestination, UnsavedDestination } from "@/lib/saved-destination"
import { DestinationProps } from "@/lib/types"
import { Bookmark } from "lucide-react"
import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"

export const SaveDestination = ({ destination }: { destination: DestinationProps | undefined | null }) => {
  const { setLoading } = useContext(LoadingContext)
  const [isUserSaved, setIsUserSaved] = useState<boolean>(false)
  const { data } = useSession()

  useEffect(() => {
    setIsUserSaved(getFavoritedUser(setLoading, destination, data?.user?.email ))
  }, [setLoading, destination, data])

  const handleSave = async () => {
    SavedDestination(setLoading, destination?.slug)
    window.location.reload()
  }

  const handleUnsave = async () => {
    UnsavedDestination(setLoading, destination?.slug)
    window.location.reload()
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={isUserSaved ? 'default' : 'outline'} className="gap-1">
          <Bookmark className={iconsSize(4)} /> {destination?._count.favoritedByUsers}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="inline-block">
          {isUserSaved ? 'Unsave': 'Save'} <span className="font-bold inline-block">{destination?.name}?</span>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={isUserSaved ? handleUnsave : handleSave}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}