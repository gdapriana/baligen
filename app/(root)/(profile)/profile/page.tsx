'use client'

import { getUser } from "@/lib/get-user"
import { userProps } from "@/lib/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<userProps>()
  
  return (
    <main>Profile</main>
  )
}