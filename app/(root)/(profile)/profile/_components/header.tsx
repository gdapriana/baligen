'use client'
import { Button } from "@/components/ui/button"
import { iconsSize } from "@/lib/constants"
import { UserProps } from "@/lib/types"
import { LucideIcon, PenBoxIcon, PlusIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const metadata = {
  actions: {
    newPost: {
      text: 'New Post',
      icon: PlusIcon as LucideIcon
    },
    editProfile: {
      text: 'Edit Profile',
      icon: PenBoxIcon as LucideIcon
    }
  }
}

export const Header = ({ profile }: { profile: UserProps | undefined }) => {
  return (
    <main className="flex h-[400px] justify-center items-center">
      <div className="flex flex-col gap-4 justify-start items-center">
        <Image src={profile?.image || ""} alt="profile" width={1000} height={1000} className="w-24 md:w-40 aspect-square rounded-full" />
        <div className="flex flex-col justify-start items-center">
          <h1 className="font-bold text-xl md:text-2xl">{profile?.name}</h1>
          <p className="text-muted-foreground">{profile?.email}</p> 
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button className="gap-1" asChild>
            <Link href='/stories/create'><metadata.actions.newPost.icon className={iconsSize(4)} /> {metadata.actions.newPost.text}</Link>
          </Button>
          <Button className="gap-1"><metadata.actions.editProfile.icon className={iconsSize(4)} />{metadata.actions.editProfile.text}</Button>
        </div>
      </div>
    </main>
  )
}