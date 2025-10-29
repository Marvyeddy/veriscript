import { NextResponse, type NextRequest } from "next/server";

export async function POST(_request: NextRequest) {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  // Clear the auth cookie
  res.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
