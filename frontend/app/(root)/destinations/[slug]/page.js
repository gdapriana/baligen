'use client'
import {useEffect, useState} from 'react';
import {Loading} from '@/components/ui/loading.jsx';
import {getDestination} from '@/app/(root)/destinations/[slug]/_utils/get-destination';
import { Bookmark, Layers2, MapPin, MessageCircle } from 'lucide-react';
import { verifytoken } from '@/lib/verifytoken';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { iconClass } from '@/lib/utils';
import { getUser } from '@/lib/get-user';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { favoriteDestination } from './_utils/favorite-destination';



export default function DestinationPage({ params }) {
  const slug = params.slug
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [destination, setDestination] = useState({})
  const [user, setUser] = useState()
  const [favoritedTotal, setFavoritedTotal] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    getDestination(setLoading, slug, setDestination).then()
  }, [])

  useEffect(() => {
    setFavoritedTotal(destination?._count?.favoritedByUsers)
  }, [destination])

  useEffect(() => {
    async function favoritedCheck() {
      if (verifytoken()) {
        setUser(await getUser())
      }
    }

    favoritedCheck()
  }, [])

  useEffect(() => {
    if (verifytoken()) {
      setLoading(true)
      setIsFavorited(destination?.favoritedByUsers?.some((item) => item?.username === user?.username))
      setLoading(false)
    }
  }, [user, destination])


  const handleFavorite = async () => {
    if (!verifytoken()) router.push('/login')
    setFavoritedTotal(favoritedTotal + 1)
    await favoriteDestination(destination?.slug)
    window.location.reload()
  }

  const handleUnfavorite = async () => {
    if (!verifytoken()) router.push('/login')
    setFavoritedTotal(favoritedTotal - 1)
  }

  const handleComment = async () => {

  }

  const handleUncomment = async () => {

  }

  if (loading) return <Loading />

  return (
    <main className="flex justify-start items-center flex-col" >
      <div className="w-full h-[600px] justify-center bg-cover bg-center items-center" style={{backgroundImage: `url(${destination?.cover})`}}>
      </div>
      <div className="w-full px-4 py-12 gap-8 max-w-6xl flex justify-center items-start">
        <div className="flex flex-col gap-8 justify-start items-stretch basis-0 grow">
          <div className="flex flex-col gap-2 justify-start items-stretch">
            <h1 className="font-bold text-2xl">{destination?.name}</h1>
            <p className="font-medium text-muted-foreground">
              {destination?.description}
            </p>
            <p className="mt-2"><MapPin className="inline" /> {destination?.address}</p>
          </div>
          <div className="py-4 border-y flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
              <Button className="gap-1" variant='outline'><Layers2 className={iconClass} />{destination?.category?.name}</Button>
              <Button className="gap-1" variant='outline'><MapPin className={iconClass} />{destination?.district?.name}</Button>
            </div>
            <div className="flex justify-center items-center">
              <Button className="gap-1" variant="ghost"><MessageCircle className={iconClass} />{destination?._count?.favoritedByUsers}</Button>
              <Button onClick={isFavorited ? handleUnfavorite : handleFavorite} className="gap-1" variant={isFavorited ? 'default' : 'ghost'}><Bookmark className={iconClass} />{favoritedTotal}</Button>
            </div>
          </div>


          {destination?._count?.images === 0 ? (
            <div className="h-[200px] flex justify-center items-center">No Additional Images</div>
          ): (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {destination?.images?.map((image) => {
                return (
                  <Dialog key={image.id}>
                    <DialogTrigger>
                      <Image alt="image" width={1920} height={1080} className="aspect-video rounded-lg" src={image.uri} />
                    </DialogTrigger>
                    <DialogContent>
                      <Image alt="image" width={1920} height={1080} className="aspect-video" src={image.uri} />
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
          )}
        </div>
        <div className="hidden lg:flex flex-col justify-start items-stretch">
          <h1 className="font-bold text-lg">Popular Categories</h1>
        </div>
      </div>
    </main>
  )
}
