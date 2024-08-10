import { Button } from "@/components/ui/button"
import { DistrictProps } from "@/lib/types"
import { LucideIcon, MapPinned } from "lucide-react"
import Link from "next/link"

const metadata = { 
  header: {
    text: 'Popular Districts',
    icon: MapPinned as LucideIcon
  },
  destinations: {
    take: 5
  }
}

export const PopularDistricts = ({ districts }: { districts: DistrictProps[] | undefined }) => {
  console.log(districts)
  return (
    <main className="flex flex-col justify-start items-stretch gap-4">
      <header>
        <h1 className="font-bold text-lg"><metadata.header.icon className="inline-block" /> {metadata.header.text}</h1>
      </header>
      <div className="flex flex-wrap gap-2">
        { districts?.map(( district: DistrictProps, index: number ) => {
          return (
            <Button variant="outline" size="sm" asChild key={district.id}>
              <Link href={`/districts/${district.slug}`}>
                {district.name}
              </Link>
            </Button>
          )
        })}
      </div>
    </main>
  )
}