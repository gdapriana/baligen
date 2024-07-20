import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any) {
  const token = await getToken({ req })
  return NextResponse.json(token)
}