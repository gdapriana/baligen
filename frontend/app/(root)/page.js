'use client'

import {Hero} from '@/app/(root)/_components/hero';
import {useEffect, useState} from 'react';
import {PopularSearch} from '@/app/(root)/_components/popular-search';
import {getDestinations} from '@/app/(root)/_utils/get-destinations';
import {PopularDestinations} from '@/app/(root)/_components/popular-destinations';
import {PopularCultures} from '@/app/(root)/_components/popular-cultures';
import {getCultures} from '@/app/(root)/_utils/get-cultures';
import {getDistricts} from '@/app/(root)/_utils/get-districts';
import {PopularDistricts} from '@/app/(root)/_components/popular-districts';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [destinations, setDestinations] = useState()
  const [cultures, setCultures] = useState()
  const [districts, setDistricts] = useState()

  useEffect(() => {
    getDestinations(setLoading, setDestinations).then()
    getCultures(setLoading, setCultures).then()
    getDistricts(setLoading, setDistricts).then()
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
      <PopularCultures cultures={cultures} />
      <PopularDistricts districts={districts} />
    </>
  )
}
