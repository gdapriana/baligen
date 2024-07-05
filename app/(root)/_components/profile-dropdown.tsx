import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExternalLink, LucideIcon, PlusIcon, User2 } from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"

const metadata = {
  dropdownItems: [
    { name: 'Post story', icon: PlusIcon as LucideIcon, route: '/post' },
    { name: 'Profile', icon: User2 as LucideIcon, route: '/profile' },
  ],
  logoutBtn: {
    text: 'Log out',
    icon: ExternalLink as LucideIcon
  }
}

export const ProfileDropdown = ({ data }: { data: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>{data.user?.name?.charAt(0)}</AvatarFallback>
            <AvatarImage src={data.user?.image || ""} />
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {data.user?.name}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {metadata.dropdownItems.map((item: {name: string; icon: LucideIcon; route: string}, index: number) => {
          return (
            <DropdownMenuItem asChild key={index}>
              <Link href={item.route} className="gap-1">
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            </DropdownMenuItem>
          )
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Button onClick={() => signOut()} variant='default' className="gap-1 w-full cursor-pointer">
            <metadata.logoutBtn.icon className="w-4 h-4" />
            {metadata.logoutBtn.text}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}