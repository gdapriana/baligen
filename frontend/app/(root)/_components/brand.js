import Link from 'next/link';
import Image from 'next/image';

export const Brand = () => {
  return (
    <Link href="/" className="flex justify-center items-center gap-2">
      <Image src="/images/logo.png" className="w-12 h-12" alt="logo" width={1000} height={1000} />
      <h1 className="font-bold text-xl hidden md:inline">
        {process.env.NEXT_PUBLIC_APP}
      </h1>
    </Link>
  )
}
