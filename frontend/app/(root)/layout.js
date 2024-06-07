"use client"

import {createContext, useState} from 'react';
import {Header} from '@/app/(root)/_components/header';

export default function RootLayout({ children }) {
  const [scrolled, setScrolled] = useState(false)

  return (
    <main className="w-full h-screen justify-start items-stretch overflow-auto">
      <Header scrolled={scrolled} />
      <div className="">
        { children }
      </div>
      <footer></footer>
    </main>
  )
}
