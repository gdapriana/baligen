'use client'

import { LoadingContext } from "@/lib/loading-provider"
import { UserProps } from "@/lib/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { Header } from "./_components/header"
import { Loading } from "@/components/ui/loading"
import { Tabs } from "./_components/tabs"
import { FavoritedDestinations } from "./_components/favorited-destinations"

export default function ProfilePage() {
  const { loading, setLoading } = useContext(LoadingContext)
  const [user, setUser] = useState<UserProps>()
  const { data, status } = useSession()
  const { push } = useRouter()
  const [activeTab, setActiveTab] = useState<'stories' | 'favStories' | 'favDestinations' | 'favCultures'>('stories')

  useEffect(() => {
    setLoading(true)
    if (status === 'unauthenticated') push('/signin')
    fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/users/${data?.user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user)
        setLoading(false)
      })
  }, [push, status, setLoading, data])
  if (loading) return <Loading />
  return (
    <main className="flex justify-center">
      <div className="max-w-6xl w-full p-4 gap-8 flex flex-col justify-start items-stretch">
        <Header profile={user} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activeTab === 'favDestinations' && (
            <FavoritedDestinations destinations={user?.favoritedDestinations} />
          )}
        </div>
      </div>
    </main>
  )
}