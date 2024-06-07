import {Button} from '@/components/ui/button';
import {LogIn} from 'lucide-react';
import {cn, iconClass} from '@/lib/utils';
import Link from 'next/link';

export const SigninBtn = ({ view }) => {
  return (
    <>
      <Button className={cn('gap-2', view === 'mobile' ? 'md:hidden' : 'hidden md:flex')} asChild>
        <Link href="/login">
          <LogIn className={iconClass} /> Login
        </Link>
      </Button>
    </>
  )
}
