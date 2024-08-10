import { DestiantionCard } from "@/app/(root)/_components/destination-card"
import { UsersFavoriteDestinationsProps } from "@/lib/types"

export const FavoritedDestinations = ({ destinations }: { destinations: UsersFavoriteDestinationsProps[] | undefined }) => {
  return (
    destinations?.map((destination: any, index: number) => {
      const data = destination.destination
      return ( 
        <DestiantionCard destination={data} index={index} key={index} />
      )
    })
  )
}