import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Doctor } from "@/lib/models/doctor";
import { Pharmacy } from "@/lib/models/pharmacy";
import { Payment } from "@/lib/models/payment";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authPayload = await verifyAuth(request);

    if (!authPayload || !authPayload.userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const [doctorCount, pharmacyCount, userPayments] = await Promise.all([
      Doctor.countDocuments({ isVerified: true }).catch((err) => {
        console.error("[v0] Error counting doctors:", err);
        return 0;
      }),
      Pharmacy.countDocuments({ isVerified: true }).catch((err) => {
        console.error("[v0] Error counting pharmacies:", err);
        return 0;
      }),
      Payment.find({ userId: authPayload.userId })
        .lean()
        .catch((err) => {
          console.error("[v0] Error fetching payments:", err);
          return [];
        }),
    ]);

    // Calculate wallet balance from payments
    const walletBalance = Array.isArray(userPayments)
      ? userPayments.reduce((sum, payment) => {
          return sum + (payment.amount || 0);
        }, 0)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        walletBalance: walletBalance.toFixed(2),
        doctorCount: doctorCount || 0,
        pharmacyCount: pharmacyCount || 0,
      },
    });
  } catch (error) {
    console.error("[v0] Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch dashboard stats",
        data: {
          walletBalance: "0.00",
          doctorCount: 0,
          pharmacyCount: 0,
        },
      },
      { status: 500 }
    );
  }
}
