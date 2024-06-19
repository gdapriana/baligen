'use client'
import {useEffect, useState} from 'react';
import {Loading} from '@/components/ui/loading.jsx';
import {getDestination} from '@/app/(root)/destinations/[slug]/_utils/get-destination';
import { Bookmark, EllipsisVertical, Layers2, Map, MapPin, MessageCircle, MessageCircleWarning, Plus, ShieldAlert, Trash, WalletMinimal } from 'lucide-react';
import { verifytoken } from '@/lib/verifytoken';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn, iconClass } from '@/lib/utils';
import { getUser } from '@/lib/get-user';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { favoriteDestination } from './_utils/favorite-destination';
import { unFavoriteDestination } from './_utils/unfavorite-destination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { commentDestination } from './_utils/comment-destination';
import { unCommentDestination } from './_utils/uncomment-destination';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
import { getCategories } from '../../_utils/get-categories';
import { getDistricts } from '../../_utils/get-districts';
import { PopularCategories } from '../_components/popular-categories';
import { PopularDistricts } from '../_components/popular-districts';


export default function DestinationPage({ params }) {
  const slug = params.slug
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [destination, setDestination] = useState({})
  const [user, setUser] = useState()
  const [categories, setCategories] = useState()
  const [districts, setDistricts] = useState()
  const [favoritedTotal, setFavoritedTotal] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    getDestination(setLoading, slug, setDestination).then()
    getCategories(setLoading, setCategories).then()
    getDistricts(setLoading, setDistricts).then()
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


  const sortedCategories = categories?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)
  const sortedDistricts = districts?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)


  const handleFavorite = async () => {
    if (!verifytoken()) router.push('/login')
    setFavoritedTotal(favoritedTotal + 1)
    await favoriteDestination(destination?.slug)
    window.location.reload()
  }

  const handleUnfavorite = async () => {
    if (!verifytoken()) router.push('/login')
    setFavoritedTotal(favoritedTotal - 1)
    await unFavoriteDestination(destination?.slug)
    window.location.reload()
  }

  const handleComment = async (e) => {
    if (!verifytoken()) router.push('/login')
    e.preventDefault()
    const payload = {
      body: e.target.comment.value
    }
    await commentDestination(payload, destination?.slug)
    window.location.reload()
  }

  const handleUncomment = async (id) => {
    if (!verifytoken()) router.push('/login')
    await unCommentDestination(id, destination?.slug)
    window.location.reload()
  }

  if (loading) return <Loading />

  return (
    <main className="flex justify-start items-center flex-col" >
      <div className="w-full h-[600px] justify-center bg-cover bg-center items-center" style={{backgroundImage: `url(${destination?.cover})`}}></div>
      <div className="w-full px-4 py-12 gap-8 max-w-6xl flex justify-center items-start">
        <div className="flex flex-col gap-8 justify-start items-stretch basis-0 grow">
          <div className="flex flex-col gap-2 justify-start items-stretch">
            <h1 className="font-bold text-2xl">{destination?.name}</h1>
            <p className="font-medium text-muted-foreground">
              {destination?.description}
            </p>
            <p className="mt-2"><MapPin className="inline" /> {destination?.address}</p>
          </div>
          <div className="py-4 border-y flex justify-between items-start">
            <div className="flex justify-start items-center gap-2 flex-wrap">
              <Button className="gap-1" variant='outline'><Layers2 className={iconClass} />{destination?.category?.name}</Button>
              <Button className="gap-1" variant='outline'><MapPin className={iconClass} />{destination?.district?.name}</Button>
              <Button variant="default" asChild>
                <Link href={`https://maps.google.com/?q=${destination?.latitude},${destination?.longitude}`}><Map className={cn('me-1', iconClass)} /> Open Maps</Link>
              </Button>
              <Button variant="default" className="gap-1">
                <WalletMinimal className={iconClass} />
                {destination.price === 0 || destination.price === undefined ? (
                  <p>Free Entry</p>
                ) : (
                  <p>Rp. {destination.price}</p>
                )}
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center">
              <Button className="gap-1" variant="ghost" asChild>
                <Link href="#comment">
                  <MessageCircle className={iconClass} />{destination?._count?.commentedByUsers}
                </Link>
              </Button>
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
                      <DialogHeader>{image.description}</DialogHeader>
                      <DialogDescription>
                        <Image alt="image" width={1920} height={1080} className="aspect-video" src={image.uri} />
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
          )}
          <div id='#comment' className='flex gap-4 flex-col justify-start items-stretch'>
            <header className='font-bold text-xl flex justify-between items-center'>
               <h1><MessageCircle className='inline' /> Comments</h1>
               {!verifytoken() ? (
                <Button asChild>
                  <Link href="/login"><Plus className={iconClass} /> Post Comment</Link>
                </Button>
               ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-1">
                      <Plus className={iconClass} /> Post Comment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleComment} className='flex justify-start items-stretch flex-col gap-4'>
                      <label htmlFor='comment'>Comment</label>
                      <Textarea required minLength={3} id='comment' name='comment' />
                      <Button type="submit" className="col-span-2">Send</Button>
                    </form>
                  </DialogContent>
                </Dialog>
               )}
            </header>
            <div className='flex flex-col justify-start items-stretch'>
              {destination?.commentedByUsers?.map((item) => {
                return (
                <article className='flex border-b py-4 flex-col justify-start items-stretch' key={item.id}>
                  <div className='flex justify-between items-center'>
                    <div className='flex justify-center items-center gap-4'>
                      <Avatar>
                        <AvatarFallback>{item?.user?.username?.charAt(0)}</AvatarFallback>
                        <AvatarImage src={item?.user?.profilePicture} />
                      </Avatar>
                      <div className='flex flex-col justify-start items-start'>
                        <p className='font-bold'>@{item?.user.username}</p>
                        <p className='font-medium text-sm text-muted-foreground'>{moment(item?.createdAt).fromNow()}</p>
                      </div>
                    </div>
                    <div className='md:flex hidden justify-center items-center'>
                      {user?.username === item?.user?.username && (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button className="gap-1" variant="ghost"><Trash className={iconClass} /> Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>Delete comment</AlertDialogHeader>
                            <AlertDialogDescription>Are you sure to delete comment?</AlertDialogDescription>
                            <AlertDialogFooter>
                              <AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <Button onClick={() => handleUncomment(item?.id)} variant="destructive">Yes</Button>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      <Button className="gap-1" variant="ghost"><MessageCircleWarning className={iconClass} /> Report</Button>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className='md:hidden'>
                        <Button variant="ghost" size="icon"><EllipsisVertical className={cn('md:hidden', iconClass)} /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <Button className="gap-1" variant="ghost"><MessageCircleWarning className={iconClass} /> Report</Button>
                        </DropdownMenuItem>
                        {user?.username === item?.user?.username && (
                          <DropdownMenuItem asChild>
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Button className="gap-1" variant="ghost"><Trash className={iconClass} /> Delete</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>Delete comment</AlertDialogHeader>
                                <AlertDialogDescription>Are you sure to delete comment?</AlertDialogDescription>
                                <AlertDialogFooter>
                                  <AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel>
                                  <AlertDialogAction asChild>
                                    <Button onClick={() => handleUncomment(item?.id)} variant="destructive">Yes</Button>
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className='py-4'>
                    <p className='text-muted-foreground'>{item?.body}</p>
                  </div>
                </article>
                )
              })}

              {destination?._count?.commentedByUsers === 0 && (
                <div className='w-full h-[200px] flex justify-center items-center'>
                  No Comment yet
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="hidden gap-4 lg:flex w-1/4 flex-col justify-start items-stretch">
          <PopularCategories categories={sortedCategories} />
          <PopularDistricts districts={sortedDistricts} />
        </div>
      </div>
    </main>
  )
}
