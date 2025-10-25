export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const decodedJwt = await verifyToken(token);

    if (!decodedJwt) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const user = await User.findOne({ _id: decodedJwt.id }).select(
      "-forgotPasswordToken -forgotPasswordTokenExpiry -password"
    );

    return NextResponse.json({ ...user?.toJSON() }, { status: 200 });
  } catch (error) {
    console.log("[User_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
