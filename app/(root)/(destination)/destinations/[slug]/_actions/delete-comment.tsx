'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { deleteComment } from "@/lib/comment-destination"
import { iconsSize } from "@/lib/constants"
import { LoadingContext } from "@/lib/loading-provider"
import { DestinationProps, UsersCommentDestinationsProps } from "@/lib/types"
import { LucideIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export const DeleteComment = ({ comment, destination, Icon }: { comment: UsersCommentDestinationsProps; destination: DestinationProps; Icon: LucideIcon }) => {
  const { data, status } = useSession()
  const { push } = useRouter()
  const { loading, setLoading } = useContext(LoadingContext)

  const deleteAction = async () => {
    await deleteComment(comment.id, destination.slug, setLoading)
    window.location.reload()
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <Icon className={iconsSize(4)} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Delete Comment
        </DialogHeader>
        Are you sure to delete <span className="font-bold inline-block">{comment.body}</span>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={deleteAction}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}