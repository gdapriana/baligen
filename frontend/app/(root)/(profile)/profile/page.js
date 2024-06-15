'use client'

import {useEffect, useState} from 'react';
import {verifytoken} from '@/lib/verifytoken';
import {useRouter} from 'next/navigation';
import {getUser} from '@/lib/get-user';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {DestinationCard, CultureCard} from '@/components/ui/card';

export default function ProfilePage () {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [activeFavorite, setActiveFavorite] = useState('destinations')

  useEffect(() => {
    async function userCheck() {
      if (verifytoken()) {
        setLoading(true)
        setUser(await getUser())
        setLoading(false)
      } else {
        router.push('/')
      }
    }
    userCheck().then()
  }, [])

  if (loading) {
    return (
      <main className="absolute z-[999] w-full top-0 h-screen flex justify-center items-center">Loading...</main>
    )
  }

  return (
    <main className="flex justify-center items-center">
      <div className="w-full gap-4 max-w-6xl flex flex-col justify-start items-stretch">
        <div className="flex gap-2 p-4 rounded-lg flex-col w-full justify-center items-center">
          <Avatar>
            <AvatarImage className="" src={user?.profilePicture} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <h1 className="font-bold text-lg">@{user?.username}</h1>
          <p className="font-medium text-muted-foreground">{user?.name}</p>
          <Button asChild>
            <Link href="/profile/update">Update Profile</Link>
          </Button>
        </div>

        <div className="flex gap-8 p-4 flex-col justify-start items-stretch">
          <div className="flex gap-4 justify-center items-center">
            <Button onClick={() => setActiveFavorite('destinations')} variant={activeFavorite === 'destinations' ? 'default': 'secondary'} className='w-1/2'>Favorited Destinations</Button>
            <Button onClick={() => setActiveFavorite('cultures')} variant={activeFavorite === 'cultures' ? 'default': 'secondary'} className='w-1/2'>Favorited Cultures</Button>
          </div>
          <div className="grid relative grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
            {activeFavorite === 'destinations' && user?.favoritedDestinations.map((item) => {
                return (
                  <DestinationCard destination={item.destination} key={item.destination.id} />
                )
              })}
            {activeFavorite === 'cultures' && user?.favoritedCultures.map((item) => {
                return (
                  <CultureCard key={item.culture.id} culture={item.culture} />
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}
