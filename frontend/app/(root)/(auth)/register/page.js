'use client'

import axios from 'axios';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import Link from 'next/link';
import {LogIn} from 'lucide-react';
import {iconClass} from '@/lib/utils';

export default function RegisterPage () {

  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const submitHandle = async (e) => {
    e.preventDefault()
    const payload = {
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value,
    }
    const confirmPassword = e.target.confirmPassword.value
    if (payload.password !== confirmPassword) {
      toast.error('password not match')
      return;
    }
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/users/register`, payload)
      setLoading(false)
      toast.success('Register success, please login')
      push('/login')
    } catch (e) {
      if (e.response) toast.error(e.response.data.errors)
      console.log(e);
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="absolute top-0 bg-muted w-full h-full">loading...</div>
    )
  }

  return (
    <main className="absolute top-0 w-full h-full bg-white flex justify-center items-center">
      <Button asChild className="absolute right-0 top-0 m-4 md:m-8">
        <Link href="/">Back Home</Link>
      </Button>
      <div className="bg-[url('/images/wallpaper.jpg')] grayscale hidden h-full w-1/2 lg:flex"></div>
      <div className="w-full lg:w-1/2 p-8 flex flex-col gap-12 justify-center items-center lg:items-start">
        <div className="flex flex-col gap-2 justify-start items-stretch">
          <h1 className="font-bold text-xl lg:text-3xl">Welcome to <span
            className="inline-block p-4 bg-stone-200 rounded-lg">{process.env.NEXT_PUBLIC_APP}</span></h1>
          <p className="text-muted-foreground">Explore the beauty of Bali!. Fill out form bellow to register</p>
          <p className="text-muted-foreground">Already have an account? <Button variant="link" size="sm" asChild><Link href="/login" className="underline">Login</Link></Button></p>
        </div>
        <form onSubmit={submitHandle} className="lg:w-1/2 w-full lg:max-w-full max-w-lg gap-8 grid grid-cols-1 lg:grid-cols-2">
          <label htmlFor="username" className="md:col-span-2 gap-4 flex flex-col justify-start items-stretch">
            <span className="text-muted-foreground">Username</span>
            <Input name="username" id="username" placeholder="username here..." />
          </label>
          <label htmlFor="name" className="md:col-span-2 gap-4 flex flex-col justify-start items-stretch">
            <span className="text-muted-foreground">Name</span>
            <Input name="name" id="name" placeholder="name here..."/>
          </label>
          <label htmlFor="password" className="col-span-1 gap-4 flex flex-col justify-start items-stretch">
            <span className="text-muted-foreground">Password</span>
            <Input name="password" id="password" type="password" placeholder="********"/>
          </label>
          <label htmlFor="confirmPassword" className="col-span-1 gap-4 flex flex-col justify-start items-stretch">
            <span className="text-muted-foreground line-clamp-1">Confirm Password</span>
            <Input name="confirmPassword" id="confirmPassword" type="password" placeholder="********"/>
          </label>
          <Button className="gap-1" type="submit">Register <LogIn className={iconClass} /></Button>
        </form>
      </div>
    </main>
  )
}
