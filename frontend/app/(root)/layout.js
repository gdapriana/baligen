"use client"

import {useEffect, useState} from 'react';
import {Header} from '@/app/(root)/_components/header';
import {getUser} from '@/lib/get-user';
import {verifytoken} from '@/lib/verifytoken';

export default function RootLayout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState()

  useEffect( () => {
    async function fetchUser() {
      setUser(await getUser())
    }
    if (verifytoken()) {
      fetchUser().then()
    }
  }, [])

  return (
    <main className="w-full h-screen justify-start items-stretch overflow-auto">
      <Header user={user} scrolled={scrolled} />
      <div className="">
        { children }
      </div>
      <footer></footer>
    </main>
  )
}
