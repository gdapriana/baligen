import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const nameParams = req.nextUrl.searchParams.get('name') as string || undefined
  const addressParams = req.nextUrl.searchParams.get('address') as string || undefined
  const priceParams = Number(req.nextUrl.searchParams.get('price')) as number || undefined
  const districtParams = req.nextUrl.searchParams.get('district') as string || undefined
  const categoryParams = req.nextUrl.searchParams.get('category') as string || undefined
  const mostSavedParams = Number(req.nextUrl.searchParams.get('saved')) as number || undefined
  const mostCommentParams = Number(req.nextUrl.searchParams.get('commented')) as number || undefined
  const mostRatedParams = Number(req.nextUrl.searchParams.get('rated')) as number || undefined

  const destinations = await prisma.destination.findMany({
    where: {
      AND: [
        {name: { contains: nameParams, mode: 'insensitive'}},
        {address: { contains: addressParams, mode: 'insensitive'}},
        {price: { equals: priceParams }},
        {districtSlug: { contains: districtParams, mode: 'insensitive'}},
        {categorySlug: { contains: categoryParams, mode: 'insensitive'}},
      ]
    },
    select: {
      _count: true,
      category: true,
      cover: true,
      id: true,
      slug: true,
      name: true,
      description: true,
      address: true,
      district: true,
      price: true,
    }
  })
  return NextResponse.json({ destinations }, { status: 200 })
}
