"use client"

import {cn} from '@/lib/utils';
import {Brand} from '@/app/(root)/_components/brand';
import {Search} from '@/app/(root)/_components/search';
import {Navigations} from '@/app/(root)/_components/navigations';
import {SigninBtn} from '@/app/(root)/_components/signin-btn';

export const Header = ({ user, scrolled }) => {
  return (
    <header className={cn('p-4 flex justify-center items-center', scrolled && 'border-b' )}>
      <div className="w-full max-w-6xl gap-4 flex justify-between items-center">
        <Brand />
        <Search />
        <Navigations />

        { !user && <SigninBtn view="desktop" /> }
        { user && <p>{user.username}</p> }

      </div>
    </header>
  )
}
