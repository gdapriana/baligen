'use client'

import {Hero} from '@/app/(root)/_components/hero';
import {useEffect, useState} from 'react';
import {PopularSearch} from '@/app/(root)/_components/popular-search';
import {getDestinations} from '@/app/(root)/_utils/get-destinations';
import {PopularDestinations} from '@/app/(root)/_components/popular-destinations';

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [destinations, setDestinations] = useState()

  useEffect(() => {
    getDestinations(setLoading, setDestinations).then()
  }, [])

  if (loading) {
    return (
      <main className="h-screen top-0 w-full z-[999999] absolute bg-white flex justify-center items-center">Loading...</main>
    )
  }

  return (
    <>
      <Hero />
      <PopularSearch destinations={destinations} />
      <PopularDestinations destinations={destinations} />
    </>
  )
}
