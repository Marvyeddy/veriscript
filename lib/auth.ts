import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface JWTPayload {
  userId: string
  email: string
  userType: "patient" | "doctor" | "pharmacist" | "admin"
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader) return null

  const parts = authHeader.split(" ")
  if (parts.length !== 2 || parts[0] !== "Bearer") return null

  return parts[1]
}

export async function verifyAuth(request: NextRequest): Promise<JWTPayload | null> {
  const token = extractToken(request)
  if (!token) return null

  return verifyToken(token)
}
