import { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";

const getCachedAddress = unstable_cache(
  async (lat: string, lon: string): Promise<string> => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=18&extratags=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Veriscript/1.0 (+https://yourdomain.com)",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error("Nominatim failed");

    const data = await response.json();
    const a = data.address || {};

    const parts = [
      a.house_number,
      a.road || a.street || a.pedestrian,
      a.suburb || a.neighbourhood || a.hamlet,
      a.city || a.town || a.village || a.municipality,
      a.state || a.province,
      a.country,
    ].filter(Boolean);

    const fullAddress = parts.join(", ");

    return fullAddress || data.display_name || "Unknown location";
  },
  ["reverse-geocode"],
  { revalidate: 60 * 60 * 24 } 
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  try {
    const address = await getCachedAddress(lat, lon);
    return Response.json({ address });
  } catch (error) {
    console.error("Reverse geocode error:", error);
    return Response.json({ address: "Address unavailable" });
  }
}