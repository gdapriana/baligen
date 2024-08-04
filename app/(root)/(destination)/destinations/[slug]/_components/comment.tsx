'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { iconsSize } from "@/lib/constants"
import { DestinationProps, UsersCommentDestinationsProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { LucideIcon, MessageCircleMore, MessageCircleOff, MessageCircleWarning, Plus, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import moment from 'moment'
import { PostComment } from "../_actions/post-comment"
import { DeleteComment } from "../_actions/delete-comment"

const metadata = {
  header: {
    icon: MessageCircleMore as LucideIcon,
    text: 'Comments',
    addCommentIcon: Plus as LucideIcon,
    addCommentText: 'Post comment'
  },
  actions: {
    delete: {
      icon: Trash2 as LucideIcon,
      text: 'Delete'
    },
    report: {
      icon: MessageCircleWarning as LucideIcon,
      text: 'Delete'
    }
  },
  noComment: {
    icon: MessageCircleOff as LucideIcon,
    text: 'No commented yet'
  }
}

export const Comment = ({ destination }: { destination: DestinationProps | null | undefined }) => {
  const { data, status } = useSession()

  return (
    <div className="flex gap-4 flex-col justify-start items-stretch mt-8">
      <header className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-bold"><metadata.header.icon className={ cn("inline-block", iconsSize(6))} /> {metadata.header.text}</h2>
        <PostComment Icon={metadata.header.addCommentIcon} text={metadata.header.addCommentText} email={data?.user?.email} slug={destination?.slug} />
      </header>
      <main className="flex justify-start mt-4 flex-col items-stretch gap-4">
        {
          destination?.commentedByUsers.length === 0 && (
            <div className="p-4 flex justify-center items-center">
              <metadata.noComment.icon className={ cn('me-1', iconsSize(4))} />
              {metadata.noComment.text}
            </div>
          )
        }
        {destination?.commentedByUsers.length !== 0 && destination?.commentedByUsers.map((comment: UsersCommentDestinationsProps, index: number) => {
          return (
            <div key={comment.id} className={cn(`py-2 flex flex-col justify-start items-stretch`, destination.commentedByUsers.length - 1 !== index && 'border-b')}>
              <header className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{comment.user.name?.charAt(0)}</AvatarFallback>
                    <AvatarImage src={comment.user.image} />
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-bold">{comment.user.name}</p>
                    <span className="text-muted-foreground font-normal text-sm">{moment(comment.createdAt).fromNow()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  {data?.user?.email === comment.user.email && (
                    <DeleteComment destination={destination} Icon={metadata.actions.delete.icon} comment={comment} />
                  )}
                  <Button size="icon" variant="outline"><metadata.actions.report.icon className={iconsSize(4)} /></Button>
                </div>
              </header>

              <main className="py-4">
                <p className="text-muted-foreground">{comment.body}</p>
              </main>
            </div>
          )
        })}
      </main>
    </div>
  )
}
