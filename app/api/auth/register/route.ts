import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/user";
import { generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password, fullName, userType, location } = body;
    console.log("1", email, password);
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log("2");
    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
    console.log("4");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );
    }
    console.log("5");
    let parsedLocation = undefined;
    if (location) {
      try {
        parsedLocation =
          typeof location === "string" ? JSON.parse(location) : location;
      } catch {
        parsedLocation = undefined;
      }
    }

    console.log("6");
    const newUser = new User({
      email,
      password,
      fullName,
      userType: userType || "patient",
      location: parsedLocation,
      isOnline: true,
      lastOnline: new Date(),
    });
    console.log("7");

    await newUser.save();
    console.log("8");
    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      userType: newUser.userType,
    });

    const res = NextResponse.json(
      {
        success: true,
        data: {
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          userType: newUser.userType,
          isVerified: newUser.isVerified,
        },
        token,
        message: "User registered successfully",
      },
      { status: 201 }
    );
    // Also set HttpOnly cookie so SSR/server routes can read token
    res.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    );
  }
}
