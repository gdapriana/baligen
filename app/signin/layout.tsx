import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function SigninLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions)
  if (session !== null) redirect('/')

  return (
    <main>{ children }</main>
  )
}