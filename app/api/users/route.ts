import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const nameParams = req.nextUrl.searchParams.get('name') as string || undefined
  const storyParams = Number(req.nextUrl.searchParams.get('story')) as number || undefined

  const users = await prisma.user.findMany({
    where: {
      AND: [
        { name: { contains: nameParams, mode: 'insensitive' } },
      ]
    },
    orderBy: [
      { stories: { _count: storyParams === 0 ? 'asc' : 'desc' } }
    ]
  })

  return NextResponse.json({ users }, { status: 200 })
}