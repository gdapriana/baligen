import {Button} from '@/components/ui/button';
import {LogIn} from 'lucide-react';
import {cn, iconClass} from '@/lib/utils';
import Link from 'next/link';

export const SigninBtn = () => {
  return (
    <>
      <Button className={cn('gap-2')} asChild>
        <Link href="/login">
          <LogIn className={iconClass} /> Login
        </Link>
      </Button>
    </>
  )
}
