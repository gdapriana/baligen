import Image from "next/image"
import Link from "next/link"

const metadata = {
  brand: {
    text: process.env.NEXT_PUBLIC_APP as string,
    route: '/',
    logo: '/images/logo.png'
  }
}

export const Brand = () => {
  return (
    <Link href={'/'} className="flex justify-center items-center gap-2">
      <Image src={metadata.brand.logo} width={1000} height={1000} alt="logo" className="w-12" /> 
      <h1 className="text-xl font-bold hidden md:inline">{metadata.brand.text}</h1>
    </Link>
  )
}