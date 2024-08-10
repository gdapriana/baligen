import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const nameParams = req.nextUrl.searchParams.get('name') as string || undefined
  const itemTaken = Number(req.nextUrl.searchParams.get('take')) as number || undefined
  const mostDestinationParams = Number(req.nextUrl.searchParams.get('destination')) as Number || undefined
  const districts = await prisma.district.findMany({
    where: {
      AND: [
        {name: { contains: nameParams, mode: 'insensitive' }},
      ]
    },
    take: itemTaken,
    orderBy: [
      { destinations: { _count: mostDestinationParams === 0 ? 'asc' : 'desc' }},
    ]
  })
  return NextResponse.json({ districts }, { status: 200 })
}