'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Tiptap from "@/components/ui/tiptap"
import { toast } from "sonner"

export default function CreateStoryPage() {
  
  const formSubmit = async (e: any) => {
    e.preventDefault()
    const payload = {
      name: e.target.name.value,
      description: e.target.description.value,
      cover: e.target.cover.value,
      body: e.target.body.value,
      readtime: Number(e.target.readtime.value)
    }

    try {
      const response = fetch('http://localhost:3000/api/stories', {
        method: 'POST',
        body: JSON.stringify(payload) 
      })
    
      toast.promise(response, {
        success: "Story Created",
        loading: "Loading...",
        error: (data) => {
          console.log(data.data);
          return <div>Hello World</div>
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <form onSubmit={formSubmit} className="flex flex-col justify-start items-stretch gap-2">
        <Input name="name" placeholder="name..." type="text" />
        <Textarea name="description" placeholder="description..." />
        <Input name="cover" placeholder="cover..." />
        <Tiptap editable />
        <Textarea name="body" placeholder="body..." />
        <Input name="readtime" placeholder="read times..." type="number" />
        <Button type="submit">Create</Button>
      </form>
    </main>
  )
}