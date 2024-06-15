import {Button} from '@/components/ui/button';
import {useState} from 'react';
import Link from 'next/link';
import {cn} from '@/lib/utils';
import {MapPin} from 'lucide-react';

export const PopularDistricts = ({ districts }) => {

  const [activeSlide, setActiveSlide] = useState(0)
  const sorted = districts?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 4)
  const allDistricts = districts?.sort((a, b) => b._count.destinations - a._count.destinations)

  return (
    <main className="flex justify-center items-center">
      <div className="w-full p-4 gap-4 max-w-6xl flex-col flex justify-center items-center">
        <div className="w-full hidden lg:flex justify-center items-center gap-4">
          {sorted?.map((item, index) => {
            return (
              <Link onMouseEnter={() => setActiveSlide(index)} style={{ backgroundImage: `url(${item.cover})` }} className={cn('border overflow-hidden flex flex-col justify-end items-stretch relative h-[250px] bg-cover rounded-xl transition-all ease-in-out duration-500', activeSlide === index ? 'w-1/3' : 'w-1/5')}
                    href={`/districts/${item.slug}`} key={item.id}>
                <div className={cn("p-4 bottom-[-200px] absolute districtGradient w-full flex flex-col justify-start items-stretch transition-all duration-500", activeSlide === index && 'bottom-0')}>
                  <div className="text-muted flex justify-start items-center gap-1 font-bold">
                    <MapPin className='' />
                    <h1 className="font-boldtext-lg text-muted">{item.name}</h1>
                  </div>
                  <p className="text-secondary/50 text-sm line-clamp-3">{item.description}</p>
                  <Button size='sm' variant='outline' className='mt-4'>{item._count.destinations} Destinations</Button>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="w-full hidden md:flex lg:hidden justify-center items-center gap-4">
          {sorted?.slice(0, 3).map((item, index) => {
            return (
              <Link className='w-1/3 border bg-cover overflow-hidden rounded-xl h-[200px] flex flex-col justify-end items-center' style={{backgroundImage: `url(${item.cover})`}} href={`/districts/${item.slug}`} key={item.id}>
                <div className="flex justify-center p-4 w-full districtGradient items-center">
                  <div className="text-muted flex justify-start items-center gap-1 font-bold">
                    <MapPin className=""/>
                    <h1 className="font-boldtext-lg text-muted">{item.name}</h1>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="w-full md:hidden flex justify-center items-center gap-4">
          {sorted?.slice(0, 2).map((item, index) => {
            return (
              <Link className='w-1/2 border bg-cover overflow-hidden rounded-xl h-[200px] flex flex-col justify-end items-center' style={{backgroundImage: `url(${item.cover})`}} href={`/districts/${item.slug}`} key={item.id}>
                <div className="flex justify-center p-4 w-full districtGradient items-center">
                  <div className="text-muted flex justify-start items-center gap-1 font-bold">
                    <MapPin className=""/>
                    <h1 className="font-boldtext-lg text-muted">{item.name}</h1>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <Button>Load More Districts</Button>
      </div>
    </main>
  )
}
