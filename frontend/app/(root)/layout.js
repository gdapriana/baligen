"use client"

import {useEffect, useState} from 'react';
import {Header} from '@/app/(root)/_components/header';
import {getUser} from '@/lib/get-user';
import {verifytoken} from '@/lib/verifytoken';
import {Footer} from '@/app/(root)/_components/footer';

export default function RootLayout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    async function fetchUser() {
      setUser(await getUser())
    }

    if (verifytoken()) {
      fetchUser().then()
      setLoading(false)
    }
    setLoading(false)
  }, [])

  return (
    <main className="w-full flex flex-col h-screen justify-start items-stretch overflow-auto">
      <Header loading={loading} user={user} scrolled={scrolled} />
      <div className="">
        { children }
      </div>
      <Footer />
    </main>
  )
}
