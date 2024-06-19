'use client'

import { useEffect, useState } from "react"
import { getCultures } from "../_utils/get-cultures"
import { Slider } from "../_components/slider"
import { Loading } from "@/components/ui/loading"
import { getCategories } from "../_utils/get-categories"
import { getDistricts } from "../_utils/get-districts"
import { Button } from "@/components/ui/button"
import { Layers2, MapPin } from "lucide-react"
import { iconClass } from "@/lib/utils"
import { PopularCategories } from "./_components/popular-categories"
import { PopularDistricts } from "./_components/popular-districts"
import { CulturesList } from "./_components/cultures-list"

export default function CulturesPage() {
  const [loading, setLoading] = useState()
  const [cultures, setCultures] = useState()
  const [sorted, setSorted] = useState('favorite')
  const [categories, setCategories] = useState()
  const [districts, setDistricts] = useState()

  useEffect(() => {
    getCultures(setLoading, setCultures).then()
    getCategories(setLoading, setCategories).then()
    getDistricts(setLoading, setDistricts).then()
  }, [])

  const sortedCultures = cultures?.sort((a, b) => b._count.favoritedByUsers - a._count.favoritedByUsers)
  const sortedCategories = categories?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)
  const sortedDistricts = districts?.sort((a, b) => b._count.destinations - a._count.destinations).slice(0, 12)

  if (loading || !cultures) return <Loading />

  return (
    <main className="flex flex-col justify-start items-center">
      <Slider items={cultures} subject='cultures' />
      <div className="w-full px-4 py-12 gap-8 max-w-6xl flex justify-center items-start">

        <div className="flex flex-col gap-8 justify-start items-stretch basis-0 grow">
          <CulturesList cultures={sortedCultures} />
        </div>

        <div className="hidden gap-4 lg:flex w-1/4 flex-col justify-start items-stretch">
          <PopularCategories categories={sortedCategories} />
          <PopularDistricts districts={sortedDistricts} />
        </div>
      </div>
    </main>
  )
}
