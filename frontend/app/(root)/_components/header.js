"use client"

import {cn, iconClass} from '@/lib/utils';
import {Brand} from '@/app/(root)/_components/brand';
import {Search} from '@/app/(root)/_components/search';
import {Navigations} from '@/app/(root)/_components/navigations';
import {SigninBtn} from '@/app/(root)/_components/signin-btn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Header = ({ loading, user, scrolled }) => {

  const router = useRouter()

  const logoutHanddle = async () => {
    localStorage.removeItem('token')
    window.location.reload()
    router.push('/')
  }

  return (
    <header className={cn('p-4 flex justify-center items-center', scrolled && 'border-b' )}>
      <div className="w-full max-w-6xl gap-4 flex justify-between items-center">
        <Brand />
        <Search />
        <Navigations />

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          !user ? <SigninBtn view="desktop" /> : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                  <AvatarImage src={user?.profilePicture} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                  <Link href='/profile'><User className={cn('', iconClass)} /> Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer gap-2" onClick={logoutHanddle}>
                  <p><LogOut className={cn('', iconClass)} />Logout</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        )}
      </div>
    </header>
  )
}
