'use client'

import { Loading } from "@/components/ui/loading"
import { getDestination } from "@/lib/get-destination"
import { LoadingContext } from "@/lib/loading-provider"
import { DestinationProps } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bookmark, MapPinned, MessageCircleMore } from "lucide-react"
import { iconsSize } from "@/lib/constants"
import { ScrollContext } from "@/lib/scroll-provider"

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const { loading, setLoading } = useContext(LoadingContext)
  const { scrolled, setScrolled } = useContext(ScrollContext)
  const [destination, setDestination] = useState<DestinationProps | null>()
  const router = useRouter()
  const scrollHandle = (event: any) => setScrolled(event.target.scrollTop > 0)

  useEffect(() => {
    async function setItem() {
      setDestination(await getDestination(setLoading, params.slug))
    }
    setItem()
  }, [setLoading, params.slug])

  if (loading) return <Loading />
  if (destination === null) {
    toast.error('Destination not found')
    router.push('/')
  }

  return (
    <div className="w-full flex justify-center items-center" onScrollCapture={ scrollHandle }>
      <div className="w-full gap-4 flex flex-col justify-start items-stretch max-w-6xl p-4">
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 3, ease: "anticipate" }} className="">
          <Image src={destination?.cover || ''} width={1920} height={1080} className="object-cover rounded-3xl aspect-video w-full" alt={destination?.name || 'cover'} />
        </motion.div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="grow basis-0 gap-4 flex justify-start items-stretch flex-col">
            <header className="flex flex-col justify-start items-stretch gap-1">
              <h1 className="font-bold text-xl md:text-2xl">{destination?.name}</h1>
              <p className="text-muted-foreground">{destination?.description}</p>
            </header>
            <div className="py-4 border-y flex justify-between items-center">
              <Button className="gap-1">
                <MapPinned className={iconsSize(4)} />
                Open in Map
              </Button>
              <div className="ms-auto flex gap-1">
                <Button variant="outline" className="gap-1">
                  <Bookmark className={iconsSize(4)} /> {destination?._count.favoritedByUsers}
                </Button>
                <Button variant="outline" className="gap-1">
                  <MessageCircleMore className={iconsSize(4)} /> {destination?._count.commentedByUsers}
                </Button>
              </div>
            </div>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id quae odit dolorem porro, doloremque quod odio? Recusandae, id. Repellendus neque praesentium doloremque quidem iste beatae exercitationem sint obcaecati, consectetur perspiciatis eum similique voluptatibus accusamus dolor numquam maxime et, commodi cupiditate nesciunt blanditiis dolores natus doloribus ab iusto. Suscipit provident eveniet mollitia aut iure pariatur, qui accusamus dolores. Distinctio ipsum perferendis nobis, tempore laborum veniam aut dolore doloremque rerum, facere optio! Odit, voluptate explicabo dignissimos ad dolor dicta soluta debitis ullam illum voluptatem nobis deserunt fuga porro, cupiditate qui? Recusandae harum, ullam tempora fuga hic sapiente beatae nihil nisi quod quae sunt cupiditate magnam aliquid nobis distinctio ea assumenda, error obcaecati minima consequatur officiis sit ipsum. Molestias modi numquam voluptates provident rem, natus deleniti aperiam ipsam. Nostrum amet est laboriosam quia, asperiores, aut in quaerat consequuntur dolore dolorum, distinctio eligendi alias quidem! Laudantium earum quis cum vero! Dolore molestias veniam atque excepturi minima tenetur ad molestiae fuga, esse similique, aliquid cumque ex ut harum sequi. Reiciendis, magnam adipisci? A obcaecati incidunt, illo dolorem suscipit quos, dolores odio reiciendis deserunt iste molestiae maiores? Veritatis ea aliquam in veniam laborum? Ullam magnam suscipit provident laborum exercitationem deserunt? Ex, quidem dolorem sit quasi ipsa tenetur, animi accusantium nihil voluptas quae reprehenderit? Minima totam, minus est odio fugiat necessitatibus beatae nostrum maiores eligendi molestiae esse ipsam a adipisci. Maiores laboriosam voluptatem corrupti perferendis tempore saepe sequi quia mollitia vero, dolorem iste itaque sit vitae nihil culpa! In consectetur quas dolore aliquid velit animi culpa accusamus itaque nisi voluptates ut eum vel harum doloremque, quos laborum, esse nemo adipisci nesciunt cum iure consequuntur, porro iusto quibusdam! Harum quidem provident perferendis vitae porro facilis, accusantium maiores eos quia suscipit esse voluptate ullam reiciendis laboriosam sequi, nemo quas nulla rerum autem hic placeat. Nam odio molestias soluta blanditiis laborum reprehenderit ea veniam tempora optio inventore commodi dolorem, alias hic deserunt illo voluptas ex eius accusamus. Earum, officia dicta quibusdam culpa voluptatem ipsum animi voluptas, perferendis expedita fugit, possimus blanditiis commodi? Amet ipsa, numquam odit nesciunt deserunt molestias voluptatibus quas eius dicta dolor repellat dolores quae quibusdam autem, quod fugit voluptatem distinctio laudantium doloremque a maxime. Esse nam reprehenderit aspernatur inventore, dolore nisi illo eum similique nobis sint labore qui quam, suscipit iste odio? Dicta, dolorem. Maiores veniam accusantium perspiciatis, illum, unde quaerat molestias sequi possimus nam minima ab iusto dolorum dolores aut corrupti distinctio commodi officiis deserunt nostrum soluta accusamus deleniti impedit vero. Quisquam recusandae hic in quam illo obcaecati ipsam. Delectus soluta voluptatibus, eaque pariatur ex amet provident? Veniam pariatur ad enim voluptatum aliquam distinctio modi ullam, a sit quisquam iste beatae porro in libero cumque placeat vel error quasi aspernatur voluptas. Dolores voluptas voluptatibus, excepturi atque deserunt architecto ut non dignissimos tenetur eaque mollitia accusamus. Facilis ex est error vero quisquam laborum iste sint, asperiores quaerat facere necessitatibus labore repellat odit architecto neque, ab suscipit amet reiciendis quod cumque. Fugiat, mollitia. Voluptatibus cum numquam consequuntur pariatur deleniti quia exercitationem, magnam modi ipsum aspernatur recusandae alias! Accusantium illum odit adipisci similique nemo modi? Labore, sed perspiciatis autem, laborum magnam, veniam assumenda hic est omnis rem exercitationem! Ab reprehenderit eum deleniti amet alias, voluptatem placeat et est quaerat fugiat inventore illum ad cumque quam voluptates temporibus. Quaerat omnis natus labore voluptate consectetur et praesentium ipsam ad. Quam sunt facere mollitia saepe vero vel pariatur unde tempore suscipit esse quo velit quos perferendis minus odio itaque officiis, officia cum obcaecati excepturi ad quaerat tempora? Iusto ea vitae ut itaque quisquam id corporis nam a atque iste! Dolorum commodi doloremque enim fuga voluptatibus sed, accusamus voluptatum est. Alias provident mollitia voluptate repudiandae officiis explicabo, eveniet non sequi at ipsam numquam? Illo illum, non beatae dolores quasi cum perspiciatis provident vero obcaecati sint cumque officia, dicta quos eius, animi corporis? Corrupti eius sunt aperiam voluptas optio molestiae. Veritatis consequatur labore dolores eligendi ea, aperiam pariatur aliquam iste! A dolores laboriosam optio iusto perferendis porro neque dignissimos inventore doloremque? Iste deleniti explicabo quas ipsam facere fugit, earum quo illum eum ex dignissimos possimus asperiores, unde saepe laborum eveniet eos? Possimus impedit officiis, repudiandae reprehenderit quam earum, similique, consectetur alias quidem ut nemo molestiae. Inventore dignissimos sapiente eligendi sint exercitationem iste consequuntur, ad illum? Numquam repellat accusantium ab saepe eligendi cupiditate possimus quasi voluptate illo ipsa quibusdam, necessitatibus quos pariatur, error omnis cum alias distinctio impedit nulla, quam voluptas illum vero. Iusto voluptatum mollitia, ratione nostrum totam ipsam laborum possimus recusandae ducimus libero deleniti magnam dolorem illum quia porro expedita quo adipisci, distinctio fugiat. Molestiae laudantium fugit minima ullam consequuntur eveniet inventore quas! Excepturi molestias qui, sint quas maiores incidunt error cupiditate assumenda eos dolorum voluptatum laudantium officiis quidem voluptatibus esse numquam deleniti expedita repellendus a tenetur sit perspiciatis ullam iste aspernatur. Consequatur odit repellendus rem. Enim excepturi dolorum sunt? Velit est, laudantium perferendis blanditiis delectus voluptatum distinctio, magnam dicta eos aut voluptas quam beatae omnis rerum a reiciendis! Debitis eos perspiciatis ad mollitia natus corporis totam commodi. Commodi numquam voluptas voluptate error. Consequuntur, ratione ipsam magnam, molestias pariatur illum mollitia laboriosam deleniti maiores provident sit quae a placeat porro repellat eius, at rerum. Iste illo quia asperiores tempora soluta, magni aperiam tempore at non quis doloremque officiis saepe quidem natus eaque vel, expedita temporibus, et totam reprehenderit architecto fugiat. Consectetur aspernatur dicta illo minima cumque, cum unde soluta molestias a beatae, nesciunt, minus commodi quaerat quisquam sit quo veritatis esse cupiditate illum aliquid possimus ullam autem eligendi. Amet voluptas nostrum earum nulla modi maiores ipsam quasi, molestias dolorum cupiditate? Qui quis voluptatum debitis suscipit? Non unde consequuntur quas facilis odio assumenda possimus. Quod iste, exercitationem nemo quis quas omnis maiores aspernatur deleniti explicabo adipisci libero, enim dolore maxime sapiente excepturi facere at cumque! Nisi commodi quibusdam deleniti voluptatem consequuntur obcaecati corrupti, debitis natus modi illo ipsa at quidem. Ducimus laborum quia consequuntur, eius enim culpa debitis quo? Quia eum possimus autem consequuntur quas ea dignissimos, nobis nesciunt est omnis commodi quo dicta a sapiente molestiae? Maxime rerum illo quod ut molestiae!
          </div>
          <div className="md:w-1/3">P</div>
        </div>
      </div>
    </div>
  )
}