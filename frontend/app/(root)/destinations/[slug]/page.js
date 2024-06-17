'use client'
import {useEffect, useState} from 'react';
import {Loading} from '@/components/ui/loading.jsx';
import {getDestination} from '@/app/(root)/destinations/[slug]/_utils/get-destination';

export default function DestinationPage({ params }) {
  const slug = params.slug
  const [loading, setLoading] = useState(true)
  const [destination, setDestination] = useState({})

  useEffect(() => {
    getDestination(setLoading, slug, setDestination).then()
  }, []);


  const handleFavorite = async () => {

  }

  const handleComment = async () => {

  }

  if (loading) return <Loading />

  return (
    <main className="flex justify-start items-center flex-col" >
      <div className="w-full h-[600px] justify-center bg-cover bg-center items-center" style={{backgroundImage: `url(${destination?.cover})`}}>
      </div>
    </main>
  )
}
