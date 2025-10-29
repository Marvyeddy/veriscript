import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/user";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    await connectDB();

    const { isOnline } = await request.json();

    await User.findByIdAndUpdate(user.userId, {
      isOnline,
      lastOnline: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating online status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    await connectDB();

    const userData = await User.findById(user.userId)
      .select("isOnline lastOnline")
      .lean();

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching online status:", error);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 }
    );
  }
}
