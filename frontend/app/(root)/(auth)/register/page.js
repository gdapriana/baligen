'use client'

import axios from 'axios';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import Link from 'next/link';

export default function RegisterPage () {

  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const submitHandle = async (e) => {
    e.preventDefault()
    const payload = {
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value
    }
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/users/register`, payload)
      setLoading(false)
      toast.success('Register success, please signin')
      push('/signin')
    } catch (e) {
      toast.error(e.response.data.errors)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="absolute top-0 bg-muted w-full h-full">loading...</div>
    )
  }

  return (
    <main className="absolute top-0 w-full h-full bg-muted flex justify-center items-center">
      <Button asChild className="absolute right-0 top-0 m-4 md:m-8">
        <Link href="/">Back Home</Link>
      </Button>
      <div className="bg-[url('/images/wallpaper.jpg')] grayscale hidden h-full w-1/2 lg:flex"></div>
      <div className="w-full lg:w-1/2"></div>
    </main>
  )
}
