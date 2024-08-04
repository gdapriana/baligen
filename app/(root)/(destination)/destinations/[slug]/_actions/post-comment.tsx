'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { iconsSize } from "@/lib/constants"
import { LucideIcon, MessageCirclePlus } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { useContext } from "react"
import { LoadingContext } from "@/lib/loading-provider"
import { postComment } from "@/lib/comment-destination"
import { toast } from "sonner"

const formSchema = z.object({
  body: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
})

const metadata = {
  header: {
    icon: MessageCirclePlus as LucideIcon,
    text: 'Post Comment'
  }
}

export const PostComment = ({ Icon, text, email, slug }: {Icon: LucideIcon; text: string; email?: string | undefined | null; slug?: string}) => {
  const { data, status } = useSession()
  const { push } = useRouter()
  const { loading, setLoading } = useContext(LoadingContext)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await postComment(values.body, slug, setLoading)
    window.location.reload()
  }

  return (
    <Dialog>
      <DialogTrigger onClick={() => {status === 'unauthenticated' && push('/signin')}}>
        <Button size="sm" className="gap-1">
          <Icon className={iconsSize(4)} />
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2><metadata.header.icon className="inline-block" /> {metadata.header.text}</h2>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
                <Button type="submit">Post</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}