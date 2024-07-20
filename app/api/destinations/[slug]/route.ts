import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const destination = await prisma.destination.findUnique({
    where: {
      slug
    },
    include: {
      _count: true,
      category: true,
      commentedByUsers: true,
      district: true,
      favoritedByUsers: true,
      images: true,
      ratedByUsers: true
    }
  })
  if (!destination) return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
  return NextResponse.json({ destination }, { status: 200 })
}