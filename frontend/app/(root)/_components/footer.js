import { Button } from "@/components/ui/button"
import { cn, iconClass, navigations } from "@/lib/utils"
import { Layers2 } from "lucide-react"
import Link from "next/link"

const others = [
  {name: "Term and Conditions", route: '/term-and-conditions'},
  {name: "Privacy and Policy", route: '/privacy-and-policy'},
  {name: "Help Center", route: '/help-center'},
]

export const Footer = () => {
  return (
    <footer className="w-full mt-16 flex flex-col justify-center items-center border-t">
      <div className="w-full max-w-6xl p-4 gap-8 flex flex-col lg:flex-row lg:items-start">
        <div className="lg:flex-1 lg:basis-0 w-full flex flex-col gap-2 lg:w-auto">
          <h1 className="text-xl font-bold text-primary">{process.env.NEXT_PUBLIC_APP}</h1>
          <p className="text-muted-foreground lg:w-2/3">This headline is short, catchy, and informative. It accurately
            reflects the content of the website, which is a guide to the best of Bali. It also uses the word &apos;thousand&apos;
            to evoke the image of Bali&apos;s many temples, which are one of the island&apos;s most popular tourist
            attractions.</p>
        </div>
        <div className="flex justify-start items-center lg:gap-8 gap-4 w-full lg:w-auto">
          <div className="flex flex-col justify-start items-start gap-4">
            <h1 className="text-primary font-bold flex justify-start items-center gap-1"><Layers2
              className={cn('inline-block', iconClass)}/> Menu</h1>
            <div className="flex flex-col gap justify-start items-start">
              {navigations.map((route, index) => {
                return (
                  <Button variant='link' key={index} asChild>
                    <Link href={route.route}>{route.name}</Link>
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <h1 className="text-primary font-bold flex justify-start items-center gap-1"><Layers2
              className={cn('inline-block', iconClass)}/> Others</h1>
            <div className="flex flex-col gap justify-start items-start">
              {others.map((other, index) => {
                return (
                  <Button variant='link' key={index} asChild>
                    <Link href={other.route}>{other.name}</Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">© 2024 copyright. All rights reserved.</div>
    </footer>
  )
}
