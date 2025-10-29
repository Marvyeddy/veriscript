import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Doctor } from "@/lib/models/doctor"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const specialty = searchParams.get("specialty")
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")

    const query: any = {}
    if (specialty) {
      query.specialization = { $regex: specialty, $options: "i" }
    }

    const doctors = await Doctor.find(query).populate("userId", "fullName avatar")

    let filteredDoctors = doctors
    if (latitude && longitude) {
      const lat = Number.parseFloat(latitude)
      const lon = Number.parseFloat(longitude)
      filteredDoctors = doctors.filter((doc) => {
        if (!doc.userId.location) return true
        const distance = Math.sqrt(
          Math.pow(doc.userId.location.latitude - lat, 2) + Math.pow(doc.userId.location.longitude - lon, 2),
        )
        return distance < 0.1 // Roughly 10km
      })
    }

    return NextResponse.json({
      success: true,
      data: filteredDoctors,
      count: filteredDoctors.length,
    })
  } catch (error) {
    console.error("Fetch doctors error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch doctors" }, { status: 500 })
  }
}
