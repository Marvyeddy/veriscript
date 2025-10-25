import { NextResponse } from "next/server";

import User from "@/lib/models/user.model";
import Doctor from "@/lib/models/doctor.model";
import Patient from "@/lib/models/patient.model";
import Pharmacy from "@/lib/models/pharmacy.model";

import { createHederaAccount } from "@/services/create-account";

export async function POST(req: Request) {
  try {
    const { email, name, password, role } = await req.json();

    if (!email || !password)
      return new NextResponse("Email and Password is required", {
        status: 400,
      });

    const user = await User.findOne({ email: email });
    if (user)
      return new NextResponse("User already exists, please login instead", {
        status: 422,
      });

    // Create Hedera account
    let hederaAccountData;
    try {
      hederaAccountData = await createHederaAccount();
    } catch (error) {
      console.error("[HEDERA_ACCOUNT_CREATION]", error);
      return new NextResponse("Failed to create blockchain account", {
        status: 500,
      });
    }

    const { hederaId, privateKey, publicKey } = hederaAccountData;

    // Create new user with encrypted private key
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role,
      hederaAccountId: hederaId,
      privateKey: privateKey, // This will be automatically encrypted by the pre-save hook
      publicKey: publicKey,
    });

    // Save user to trigger encryption and hashing
    await newUser.save();

    try {
      if (role === "patient") {
        await Patient.create({
          user: newUser._id,
        });
      } else if (role === "doctor") {
        await Doctor.create({
          user: newUser._id,
        });
      } else if (role === "pharmacy") {
        await Pharmacy.create({
          user: newUser._id,
        });
      } 
    } catch (profileError) {
      console.error("[PROFILE_CREATION]", profileError);
      // If profile creation fails, delete the user to maintain data consistency
      await User.findByIdAndDelete(newUser._id);
      return new NextResponse("Failed to create user profile", {
        status: 500,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[AUTH_SIGNUP]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
