import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { navigations } from '@/lib/utils';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {AlignJustify} from 'lucide-react';
import Image from 'next/image';
import {SigninBtn} from '@/app/(root)/_components/signin-btn';

export const Navigations = () => {
  return (
    <>
      <div className="lg:flex hidden">
        {navigations.map((route, index) => {
          return (
            <Button size="" variant="ghost" key={index}>
              <Link href={route.route}>{route.name}</Link>
            </Button>
          )
        })}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <AlignJustify className="w-6 h-6 text-muted-foreground lg:hidden" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex justify-center items-center gap-2">
              <Image src="/images/logo.png" alt="logo" width={1000} height={1000} className="w-8 h-8" />
              {process.env.NEXT_PUBLIC_APP}
            </SheetTitle>
          </SheetHeader>
          <div className="grid gap-1 py-4">
            {navigations.map((route, index) => {
              return (
                <Button size="" variant="ghost" key={index}>
                  <Link href={route.route}>{route.name}</Link>
                </Button>
              )
            })}
          </div>
          <SheetFooter>
            <SheetClose asChild>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
