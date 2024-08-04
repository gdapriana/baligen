import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: {params: { slug: string }}, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const { body } = await req.json()

  const bodySchema = z.string().min(3)
  const response = bodySchema.safeParse(body)

  if (!response.success) {
    const { errors } = response.error;
    return NextResponse.json({ errors }, { status: 401 })
  }

  if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  const destination = await prisma.destination.findUnique({ where: { slug: params.slug } })
  if (!destination) return NextResponse.json({ error: 'Destination not found' }, { status: 404 })

  const comment = await prisma.usersCommentDestinations.create({
    data: { body, userEmail: session.user?.email as string, destinationSlug: params.slug },
    select: {
      destination: true
    }
  })
  return NextResponse.json({ comment }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const { id } = await req.json()
  if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  const destination = await prisma.destination.findUnique({ where: {slug: params.slug } })
  if (!destination) return NextResponse.json({ error: 'destination not found' }, { status: 404 })
  const comment = await prisma.usersCommentDestinations.findUnique({ where: { id } })
  if (!comment) return NextResponse.json({ error: 'comment found' }, { status: 404 })
  return prisma.usersCommentDestinations.delete({ where: { id }})
}