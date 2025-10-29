import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>,
) {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  return handler(request, user)
}

export async function withAuthAndRole(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>,
  allowedRoles: string[],
) {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  if (!allowedRoles.includes(user.userType)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
  }

  return handler(request, user)
}
