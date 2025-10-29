import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Mock doctor detail - replace with actual database call
    const doctor = {
      id: Number.parseInt(id),
      name: "Doctor Benjamin Okoli",
      type: "Paediatrician",
      doctorId: id,
      fee: 200,
      currency: "HBAR",
      rating: 4.7,
      reviews: 234,
      distance: "2 metres Away",
      latitude: 6.5244,
      longitude: 3.3792,
      image: "/assets/doctorPictor.svg",
      isAvailable: true,
      bio: "Experienced paediatrician with 10+ years of practice",
      languages: ["English", "Yoruba"],
      experience: "10+ years",
      education: "University of Lagos Medical School",
      specializations: ["Paediatrics", "Child Health"],
      availableSlots: [
        { date: "2024-01-15", time: "09:00" },
        { date: "2024-01-15", time: "10:00" },
        { date: "2024-01-15", time: "14:00" },
      ],
    }

    return NextResponse.json({
      success: true,
      data: doctor,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch doctor details" }, { status: 500 })
  }
}
