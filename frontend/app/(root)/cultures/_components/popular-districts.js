import { Button } from "@/components/ui/button"
import { iconClass } from "@/lib/utils"
import { MapPin } from "lucide-react"

export const PopularDistricts = ({ districts }) => {
  return (
    <>
      <h1 className="font-bold text-lg">Popular District</h1>
      <main className='flex flex-wrap gap-2 justify-start items-start'>
        {districts?.map((item) => {
          return (
            <Button variant="outline" onClick={() => alert('Available soon')} className="gap-1" key={item.id}><MapPin className={iconClass} />{item.name}</Button>
          )
        })}
      </main>
    </>
  )
}
