import Image from 'next/image';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {MapPin} from 'lucide-react';
import {iconClass} from '@/lib/utils';
import {Badge} from '@/components/ui/badge';
import {Card} from '@/components/ui/card';

const metadata = {
  title: 'Popular Destinations',
  subtitle: 'Experience the Beautiful Fusion of Bali Nature and Culture'
}

export const PopularDestinations = ({ destinations }) => {

  const sorted = destinations?.slice(0, 3).sort((a, b) => b._count.favoritedByUsers - a._count.favoritedByUsers)

  return (
    <main className="flex justify-center items-center">
      <div className="w-full gap-8 max-w-6xl px-4 py-20 flex flex-col justify-start items-stretch lg:flex-row lg:justify-center lg:items-center">
        <div className="flex w-full lg:w-1/4 justify-center items-center flex-col">
          <Image src='/images/logo3.png' alt='logo' className="w-44 lg:w-52 lg:h-52 h-44" width={1000} height={1000} />
          <h1 className="font-bold text-xl">{metadata.title}</h1>
          <p className="text-center text-muted-foreground">{metadata.subtitle}</p>
          <Button className="mt-4 hidden lg:flex">Load more</Button>
        </div>
        <div className="w-full lg:w-auto lg:gap-4 gap-1 flex justify-center items-center lg:basis-0 lg:grow overflow-auto">
          <div className="lg:w-full gap-2 grid grid-cols-3 grid-rows-1">
            {sorted?.map((destination) => {
              return (
                <Card destination={destination} key={destination.id} />
              )
            })}
          </div>
        </div>
        <Button className="lg:hidden">Load more</Button>
      </div>
    </main>
  )
}
