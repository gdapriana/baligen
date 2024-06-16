'use client'
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Input} from '@/components/ui/input';
import {LogIn} from 'lucide-react';
import {iconClass} from '@/lib/utils';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {axiosInstance} from '@/lib/axios';
import {verifytoken} from '@/lib/verifytoken';

export default function LoginPage () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (verifytoken()) {
      router.push('/')
    }
    setLoading(false)
  }, []);

  const submitHandle = async (e) => {
    e.preventDefault()
    const payload = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    setLoading(true)
    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_SERVER}/users/login`, payload)
      console.log(response.data);
      localStorage.setItem('token', response.data.data.accessToken)
      setLoading(false)
      toast.success('Login success')
      window.location.reload()
      push('/')
    } catch (e) {
      if (e.response) toast.error(e.response.data.errors)
      console.log(e);
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="absolute top-0 bg-muted w-full h-full flex justify-center items-center">loading...</div>
    )
  }

  return (
    <main className="w-full h-screen bg-white absolute top-0 flex justify-center items-center">
      <Button asChild className="absolute left-0 top-0 m-4 md:m-8">
        <Link href="/">Back Home</Link>
      </Button>
      <div className="w-full lg:w-1/2 p-8 flex flex-col gap-12 justify-center items-center lg:items-end">
        <div className="flex flex-col gap-2 justify-start items-stretch">
          <h1 className="font-bold text-xl lg:text-end lg:text-3xl">Welcome to <span
            className="inline-block p-4 bg-stone-200 rounded-lg">{process.env.NEXT_PUBLIC_APP}</span></h1>
          <p className="text-muted-foreground lg:text-end">Explore the beauty of Bali!. Fill out form bellow to register</p>
          <p className="text-muted-foreground lg:text-end">No have an account? <Button variant="link" size="sm" asChild><Link
            href="/register" className="underline">Register</Link></Button></p>
        </div>
        <form onSubmit={submitHandle}
              className="lg:w-1/2 w-full lg:max-w-full max-w-lg gap-8 grid grid-cols-1 lg:grid-cols-2">
          <label htmlFor="username" className="md:col-span-2 gap-4 flex flex-col justify-start items-stretch">
            <span className="text-muted-foreground">Username</span>
            <Input name="username" id="username" placeholder="username here..."/>
          </label>
          <label htmlFor="password" className="col-span-2 gap-4 flex flex-col justify-start items-stretch">
            <span className="text-muted-foreground">Password</span>
            <Input name="password" id="password" type="password" placeholder="********"/>
          </label>
          <Button className="gap-1" type="submit">Login <LogIn className={iconClass}/></Button>
        </form>
      </div>
      <div className="hidden lg:flex h-full lg:w-1/2 bg-[url('/images/wallpaper.jpg')] bg-cover bg-right"></div>
    </main>
  )
}
