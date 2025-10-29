import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/user";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    console.log("User", user);
    await connectDB();

    const profile = await User.findById(user.userId).select("-password").lean();

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
