import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const iconClass = "w-4 h-4"
export const navigations = [
  { name: "Home", route: "/" },
  { name: "Destinations", route: "/destinations"},
  { name: "Cultures", route: "/cultures" },
  { name: "Contact us", route: "/contact" }
]
