import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Pharmacy } from "@/lib/models/pharmacy"
import { calculateDistance } from "@/lib/utils/distance"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    await connectDB()

    const { latitude, longitude, maxDistance = 50 } = await request.json()

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Location required" }, { status: 400 })
    }

    // Get all verified pharmacies
    const pharmacies = await Pharmacy.find({ isVerified: true }).populate("userId").lean()

    // Calculate distances and filter
    const pharmaciesWithDistance = pharmacies
      .map((pharmacy) => {
        const distance = calculateDistance(latitude, longitude, pharmacy.location.latitude, pharmacy.location.longitude)
        return { ...pharmacy, distance }
      })
      .filter((p) => p.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)

    return NextResponse.json(pharmaciesWithDistance)
  } catch (error) {
    console.error("Error fetching nearby pharmacies:", error)
    return NextResponse.json({ error: "Failed to fetch pharmacies" }, { status: 500 })
  }
}
