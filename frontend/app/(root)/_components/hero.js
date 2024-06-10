import Image from 'next/image';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Rocket} from 'lucide-react';

const metadata = {
  description: 'Your Gateway to Bali Enchanting Culture and Breathtaking Landscapes'
}

export const Hero = () => {
  return (
    <main style={{
      background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url("/images/hero.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} className="h-[600px] bg-cover bg-center flex justify-center items-center">
      <div className="flex p-4 flex-col gap-2 justify-center items-center">
        <div className="flex gap-2 justify-center items-center">
          <Image src="/images/logo.png" alt="logo" width={1000} height={1000} className="w-16 h-16"/>
          <h1 className="font-bold text-[3rem] text-border text-muted">{process.env.NEXT_PUBLIC_APP}</h1>
        </div>
        <p className="text-xl font-medium text-muted text-center">{metadata.description}</p>
        <Button variant="secondary" size="lg" className="gap-2 mt-8" asChild>
          <Link href="#dashboard" className="text-xl">
            Explore Now <Rocket/>
          </Link>
        </Button>
      </div>
    </main>
  )
}
