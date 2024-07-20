
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function CreateStoryLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session === null) {
    redirect('/signin')
  }

  return (
    <main className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl">
        {children}
      </div>
    </main>
  )
}