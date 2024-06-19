'use client'

import { useEffect, useState } from "react"
import { getDestinations } from "../_utils/get-destinations"
import { Loading } from "@/components/ui/loading"
import { Slider } from "../_components/slider"
import { getCategories } from "../_utils/get-categories"
import { getDistricts } from "../_utils/get-districts"
import { Button } from "@/components/ui/button"
import { Layers2, MapPin } from "lucide-react"
import { iconClass } from "@/lib/utils"
import { PopularDistricts } from "./_components/popular-districts"
import { PopularCategories } from "./_components/popular-categories"
import { DestinationsList } from "./_components/destinations-list"

export default function DestinationsPage() {
  const [loading, setLoading] = useState()
  const [destinations, setDestinations] = useState()
  const [sorted, setSorted] = useState('favorite')
  const [categories, setCategories] = useState()
  const [districts, setDistricts] = useState()

  useEffect(() => {
    getDestinations(setLoading, setDestinations).then()
    getCategories(setLoading, setCategories).then()
    getDistricts(setLoading, setDistricts).then()
  }, [])

  const sortedDestinations = destinations?.sort((a, b) => b._count.favoritedByUsers - a._count.favoritedByUsers)
  const sortedCategories = categories?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)
  const sortedDistricts = districts?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)

  if (loading || !destinations) return <Loading />

  return (
    <main className="flex flex-col justify-start items-center">
      <Slider items={destinations} subject='destinations' />
      <div className="w-full px-4 py-12 gap-8 max-w-6xl flex justify-center items-start">

        <div className="flex flex-col gap-8 justify-start items-stretch basis-0 grow">
          <DestinationsList destinations={sortedDestinations} />
        </div>

        <div className="hidden gap-4 lg:flex w-1/4 flex-col justify-start items-stretch">
          <PopularCategories categories={sortedCategories} />
          <PopularDistricts districts={sortedDistricts} />
        </div>
      </div>
    </main>
  )
}
