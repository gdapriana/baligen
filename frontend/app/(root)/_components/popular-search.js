import {Badge} from '@/components/ui/badge';
import {InteractiveMarquee} from '@/app/(root)/_components/marquee';

export const PopularSearch = ({ destinations }) => {

  const sorted = destinations?.sort((a, b) => b._count.ratedByUsers - a._count.ratedByUsers)

  return (
    <main className="w-full border-y flex justify-center items-center">
      <div className="w-full max-w-6xl p-4 flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-auto border-r pr-4">
          <h1 className="text-center font-bold text-lg">Popular Search</h1>
        </div>
        <div className="w-full flex justify-center items-center gap-2 overflow-hidden lg:basis-0 lg:grow">
          <InteractiveMarquee>
            {sorted?.map((destination) => {
              return (
                <Badge key={destination.id} className="whitespace-nowrap mx-1">{destination.name}</Badge>
              )
            })}
          </InteractiveMarquee>
        </div>
      </div>
    </main>
  )
}
