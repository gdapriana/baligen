import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string }}) {
  const slug = params.slug
  const story = await prisma.story.findUnique({ 
    where: { slug },
    include: { _count: true, commentedByUsers: true, favoritedByUsers: true, images: true, user: true }
  })
  if (!story) return NextResponse.json({ error: 'Story Not Found' }, { status: 404 })
  return NextResponse.json({ story }, { status: 200 })
}