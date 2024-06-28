'use client'

import { Button } from "@/components/ui/button"
import { iconsSize } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ChevronLeft, LucideIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const metadata = {
  title: 'Welcome to',
  subtitle: 'Explore the beauty of Bali. Choose signin option bellow',
  noAccountText: 'No have an account?',
  registerText: 'Register',
  background: '/images/signin.jpg',
  backBtn: {
    text: 'Back To Dashboard',
    logo: ChevronLeft as LucideIcon,
    route: '/'
  },

  siginInOptions: [
    { name: "google", logo: "/images/google.svg" },
    { name: "github", logo: "/images/github.svg" }
  ],
  iconSize: 5
}

export default function SignInPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full flex-col relative gap-8 h-full md:w-1/2 p-4 flex justify-center items-center">
        <Button className="gap-2 absolute top-0 left-0 m-4" asChild>
          <Link href={metadata.backBtn.route}>
            <metadata.backBtn.logo /> {metadata.backBtn.text}
          </Link>
        </Button>
        <header className="flex flex-col justify-start items-center gap-2">
          <h1 className="font-bold text-xl md:text-2xl">{metadata.title} <span className="inline-block bg-muted p-4 ms-2 rounded-lg">{process.env.NEXT_PUBLIC_APP}</span></h1>
          <p className="text-muted-foreground text-center font-medium">{metadata.subtitle}</p>
        </header>
        <main className="flex justify-center items-center gap-4">
          {metadata.siginInOptions.map((item: {name: string; logo: string}, index: number) => {
            return (
              <Button onClick={() => signIn(item.name)} className="h-auto" variant="secondary" key={index}>
                <Image src={item.logo} alt={item.name} width={200} height={200} style={{ width: '40px'}} className={cn('', iconsSize(metadata.iconSize))}/>
                {item.name}
              </Button>
            )
          })}
        </main>
      </div>
      <div style={{ backgroundImage: `url(${metadata.background})` }} className="hidden bg-cover bg-center md:flex h-full md:w-1/2"></div>
    </div>
  )
}
