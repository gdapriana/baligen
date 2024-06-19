import { Button } from "@/components/ui/button"
import { iconClass } from "@/lib/utils"
import { Layers2 } from "lucide-react"

export const PopularCategories = ({ categories }) => {
  return (
    <>
      <h1 className="font-bold text-lg">Popular Categories</h1>
      <div className='flex flex-wrap gap-2 justify-start items-start'>
        {categories?.map((item) => {
          return (
            <Button onClick={() => alert('Available soon')} variant="outline" className="gap-2" key={item.id}><Layers2 className={iconClass} />{item.name}</Button>
          )
        })}
      </div>
    </>
  )
}
