'use client'

import {useEffect, useState} from 'react';
import {verifytoken} from '@/lib/verifytoken';
import {useRouter} from 'next/navigation';
import {getUser} from '@/lib/get-user';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage () {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    setLoading(true)
    async function userCheck() {
      if (verifytoken()) {
        setUser(await getUser())
      } else {
        router.push('/')
      }
    }
    userCheck().then()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="absolute w-full top-0 h-screen flex justify-center items-center">Loading...</main>
    )
  }

  return (
    <main className="flex justify-center items-center">
      <div className="w-full gap-4 max-w-6xl flex justify-start items-stretch">
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

        <div className="flex flex-col justify-start items-stretch">
          {

          }
          <h1>Favorited</h1>
        </div>
      </div>
    </main>
  )
}
