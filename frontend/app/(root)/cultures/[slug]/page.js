'use client'
import { useEffect, useState } from "react"
import { getCulture } from "./_utils/get-culture"
import { Loading } from "@/components/ui/loading"
import { getDistricts } from "../../_utils/get-districts"
import { getCategories } from "../../_utils/get-categories"
import { Button } from "@/components/ui/button"
import { Bookmark, EllipsisVertical, Layers2, MapPin, MessageCircle, MessageCircleWarning, Plus, Trash } from "lucide-react"
import { cn, iconClass } from "@/lib/utils"
import Link from "next/link"
import { verifytoken } from "@/lib/verifytoken"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { commentCulture } from "./_utils/comment-culture"
import { unCommentCulture } from "./_utils/uncomment-culture"
import { unFavoriteCulture } from "./_utils/unfavorite-culture"
import { favoriteCulture } from "./_utils/favorite-culture"
import { getUser } from "@/lib/get-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import moment from "moment"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CulturePage({ params }) {
  const slug = params.slug
  const [culture, setCulture] = useState()
  const [loading, setLoading] = useState()
  const [categories, setCategories] = useState()
  const [districts, setDistricts] = useState()
  const [favoritedTotal, setFavoritedTotal] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    getCulture(setLoading, slug, setCulture).then()
    getDistricts(setLoading, setDistricts).then()
    getCategories(setLoading, setCategories).then()
  }, [])

  useEffect(() => {
    setFavoritedTotal(culture?._count?.favoritedByUsers)
  }, [culture])

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
      setIsFavorited(culture?.favoritedByUsers?.some((item) => item?.username === user?.username))
      setLoading(false)
    }
  }, [user, culture])

  const sortedCategories = categories?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)
  const sortedDistricts = districts?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)


  const handleFavorite = async () => {
    if (!verifytoken()) router.push('/login')
    setFavoritedTotal(favoritedTotal + 1)
    await favoriteCulture(culture?.slug)
  }

  const handleUnfavorite = async () => {
    if (!verifytoken()) router.push('/login')
    setFavoritedTotal(favoritedTotal - 1)
    await unFavoriteCulture(culture?.slug)
    window.location.reload()
  }

  const handleComment = async (e) => {
    if (!verifytoken()) router.push('/login')
    e.preventDefault()
    const payload = {
      body: e.target.comment.value
    }
    await commentCulture(payload, culture?.slug)
    window.location.reload()
  }

  const handleUncomment = async (id) => {
    if (!verifytoken()) router.push('/login')
    await unCommentCulture(id, culture?.slug)
    window.location.reload()
  }

  if (loading) return <Loading />

  return (
    <main className="flex justify-start items-center flex-col">
      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${culture?.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="w-full flex flex-col justify-center items-center h-[600px] bg-cover bg-center">
      </div>
      <div className="w-full px-4 py-12 gap-8 max-w-6xl flex justify-center items-start">
        <div className="flex flex-col gap-8 justify-start items-stretch basis-0 grow">
          <div className="flex flex-col gap-2 justify-start items-stretch">
            <h1 className="font-bold text-2xl">{culture?.name}</h1>
            <p className="font-medium text-muted-foreground">
              {culture?.description}
            </p>
          </div>


          <div className="py-4 border-y flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
              {culture?.district === null ? (
                <p className="mt-2"><MapPin className="inline" /> General Culture</p>
              ) : (
                <p className="mt-2"><MapPin className="inline" /> {culture?.district.name}</p>
              )}
            </div>
            <div className="flex justify-center items-center">
              <Button className="gap-1" variant="ghost" asChild>
                <Link href="#comment">
                  <MessageCircle className={iconClass} />{culture?._count?.commentedByUsers}
                </Link>
              </Button>
              <Button onClick={isFavorited ? handleUnfavorite : handleFavorite} className="gap-1" variant={isFavorited ? 'default' : 'ghost'}><Bookmark className={iconClass} />{favoritedTotal}</Button>
            </div>
          </div>


          <div dangerouslySetInnerHTML={{__html: culture?.body}} className="prose"></div>


          {culture?._count?.images === 0 ? (
            <div className="h-[200px] flex justify-center items-center">No Additional Images</div>
          ): (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {culture?.images?.map((image) => {
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
              {culture?.commentedByUsers?.map((item) => {
                return (
                <article className='flex border-b py-4 flex-col justify-start items-stretch' key={item.id}>
                  <div className='flex justify-between items-center'>
                    <div className='flex justify-center items-center gap-4'>
                      <Avatar>
                        <AvatarFallback>{item?.user?.username?.charAt(0)}</AvatarFallback>
                        <AvatarImage src={item?.user?.profilePicture} />
                      </Avatar>
                      <div className='flex flex-col justify-start items-start'>
                        <p className='font-bold'>@{item?.user?.username}</p>
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

              {culture?._count?.commentedByUsers === 0 && (
                <div className='w-full h-[200px] flex justify-center items-center'>
                  No Comment yet
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden gap-4 lg:flex w-1/4 flex-col justify-start items-stretch">
          <h1 className="font-bold text-lg">Popular Categories</h1>
          <div className='flex flex-wrap gap-2 justify-start items-start'>
            {sortedCategories?.map((item) => {
              return (
                <Button variant="outline" className="gap-2" key={item.id}><Layers2 className={iconClass} />{item.name}</Button>
              )
            })}
          </div>
          <h1 className="font-bold text-lg">Popular District</h1>
          <div className='flex flex-wrap gap-2 justify-start items-start'>
            {sortedDistricts?.map((item) => {
              return (
                <Button variant="outline" className="gap-1" key={item.id}><MapPin className={iconClass} />{item.name}</Button>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
