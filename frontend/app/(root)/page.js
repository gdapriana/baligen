'use client'

import {Hero} from '@/app/(root)/_components/hero';
import {useState} from 'react';
import {PopularSearch} from '@/app/(root)/_components/popular-search';

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [destinations, setDestinations] = useState()

  if (loading) {
    return (
      <main className="h-screen w-full absolute bg-white flex justify-center items-center">Loading...</main>
    )
  }

  return (
    <>
      <Hero />
      <PopularSearch loading={loading} setLoading={setLoading} destinations={destinations} />
    </>
  )
}
