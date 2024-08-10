import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: {email: string}}, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  
  const user = await prisma.user.findUnique({
    where: {email: params.email},
    include: {
      _count: true,
      accounts: true,
      commentedCultures: true,
      commentedDestinations: true,
      commentedStories: true,
      favoritedCultures: true,
      favoritedDestinations: {
        include: {
          destination: {
            include: {
              _count: true,
            }
          }
        }
      },
      favoritedStories: true,
      ratedDestinations: true,
      stories: true
    }
  })

  return NextResponse.json({ user }, { status: 200 })
}