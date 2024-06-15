import Link from 'next/link';
import Image from 'next/image';
import {Bookmark, MapPin} from 'lucide-react';
import {iconClass} from '@/lib/utils';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';

export const DestinationCard = ({ destination}) => {
  return (
    <Link href={`/destinations/${destination?.slug}`} className="flex lg:w-auto flex-col justify-start overflow-hidden rounded-2xl items-stretch">
      <Image src={destination?.cover} alt='cover' className="aspect-[16/10] object-cover" width={1920} height={1080} />
      <div className="p-4 rounded-b-2xl border flex flex-col justify-start items-stretch">
        <h1 className="font-bold">{destination?.name}</h1>
        <p className="text-muted-foreground line-clamp-3 text-sm font-medium">{destination?.description}</p>
        <div className="flex mt-2 justify-between items-center">
          <div className="flex justify-center items-center gap-1">
            <MapPin className={iconClass} /> <span>{destination?.district?.name}</span>
          </div>
          <Badge className="hidden lg:inline">{destination?.category?.name}</Badge>
        </div>
      </div>
    </Link>
  )
}

export const CultureCard = ({ culture }) => {
  return (
    <Link href={`/cultures/${culture?.slug}`} className="flex lg:w-auto flex-col justify-start overflow-hidden rounded-2xl items-stretch">
      <Image src={culture?.cover} alt='cover' className="aspect-[16/10] object-cover" width={1920} height={1080} />
      <div className="p-4 rounded-b-2xl border flex flex-col justify-start items-stretch">
        <h1 className="font-bold">{culture?.name}</h1>
        <p className="text-muted-foreground line-clamp-3 text-sm font-medium">{culture?.description}</p>
        <div className="flex gap-2 mt-4 justify-start items-center">
          <Button size="sm" variant="outline" className='gap-1'>
            <Bookmark className={iconClass} />
            {culture?._count?.favoritedByUsers}
          </Button>
          <Button size="sm" variant="outline" className='gap-1'>
            <Bookmark className={iconClass} />
            {culture?._count?.commentedByUsers}
          </Button>
        </div>
      </div>
    </Link>
  )
}
