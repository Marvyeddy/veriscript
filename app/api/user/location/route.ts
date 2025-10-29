// app/api/user/location/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/user";
import { verifyAuth } from "@/lib/auth";

interface LocationPayload {
  latitude: number;
  longitude: number;
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: LocationPayload = await req.json();

    const { latitude, longitude } = body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        { error: "Latitude and longitude must be numbers." },
        { status: 400 }
      );
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: "Invalid coordinate ranges." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(
      auth.userId,
      { location: { latitude, longitude } },
      { new: true, select: "location" }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, location: user.location });
  } catch (err) {
    console.error("[PUT /api/user/location] error:", err);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(auth.userId).select("location");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ location: user.location ?? null });
  } catch (err) {
    console.error("[GET /api/user/location] error:", err);
    return NextResponse.json({ error: "Failed to fetch location" }, { status: 500 });
  }
}