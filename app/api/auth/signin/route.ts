export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import User from "@/lib/models/user.model";

import { generateToken, parseExpirationToMs } from "@/lib/auth";

const LONG_TERM_EXPIRES_IN = process.env.LONG_TERM_EXPIRES_IN ?? "7d";

const errorResponse = (message: string, status: number) =>
  new NextResponse(message, { status });

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return errorResponse("Email and Password are required.", 400);

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) return errorResponse("Invalid credentials", 401);

    const passMatch = await user.comparePassword(password);

    if (!passMatch) {
      return errorResponse("Invalid credentials", 401);
    }

    await user.save();

    const token = await generateToken({
      id: user._id.toString(),
      role: user.role,
      name: user.name,
    });

    (await cookies()).set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + parseExpirationToMs(LONG_TERM_EXPIRES_IN)),
    });
    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.log("[AUTH_SIGNIN]", error);
    return errorResponse("Internal Server Error", 500);
  }
}
