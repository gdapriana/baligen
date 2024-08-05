import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params } : { params: { slug: string } }, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  const destination = await prisma.destination.findUnique({ where: { slug: params.slug } })
  if (!destination) return NextResponse.json({ error: 'destination not found' }, { status: 404 })
  
  const saved = await prisma.usersFavoriteDestinations.create({
    data: {
      destinationSlug: params.slug,
      userEmail: session.user?.email!
    },
    select: {
      destination: true
    }
  })
  return NextResponse.json({ saved }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } } , res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  const destination = await prisma.destination.findUnique({ where: { slug: params.slug } })
  if (!destination) return NextResponse.json({ error: 'destination not found' }, { status: 404 })

  const unsave = await prisma.usersFavoriteDestinations.delete({
    where: {
      userEmail_destinationSlug: {
        destinationSlug: params.slug,
        userEmail: session.user?.email!
      }
    }
  })
  return NextResponse.json({ unsave }, { status: 200 })
}