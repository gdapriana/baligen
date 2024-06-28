import { routesProps } from "./types"

export const iconsSize = (size: number): string => {
  return `w-${size} h-${size}`
}

export const routes:routesProps[] = [
  {name: 'Home', route: '/'},
  {name: 'Stories', route: '/stories'},
  {name: 'Destinations', route: '/destinations'},
  {name: 'Cultures', route: '/cultures'}
]