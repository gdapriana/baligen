import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import slugify from 'slugify'
import prisma from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (session === null) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  const schema = z.object({
    name: z.string().min(3).max(200),
    body: z.string().min(20),
    description: z.string().min(10).max(500),
    cover: z.string().url(),
    readtime: z.number()
  })
  const data = await req.json()
  const response = schema.safeParse(data)
  if (!response.success) {
    const { errors } = response.error;
    return NextResponse.json({ errors }, { status: 401 })
  }
  const slug = `${slugify(response.data.name, { replacement: '-', lower: true })}-${new Date().getTime().toString()}`
  const story = await prisma.story.create({
    data: {
      slug,
      ...response.data,
      userEmail: session.user?.email as string
    },
    select: {
      name: true
    }
  })
  return NextResponse.json({ story }, { status: 200 })
}

export async function GET(req: NextRequest, res: NextResponse) {
  const nameParams = req.nextUrl.searchParams.get('name') as string || undefined
  const mostSavedParams = Number(req.nextUrl.searchParams.get('saved')) as number || undefined
  const mostCommentParams = Number(req.nextUrl.searchParams.get('commented')) as number || undefined
  const stories = await prisma.story.findMany({ 
    where: {
      AND: [
        { name: { contains: nameParams, mode: 'insensitive'}}
      ]
    },
    select: {
      _count: true,
      cover: true,
      createdAt: true,
      name: true,
      user: true,
      slug: true,
    }
   })
   return NextResponse.json({ stories }, { status: 200 })
}