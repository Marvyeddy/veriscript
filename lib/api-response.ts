import { NextResponse } from "next/server"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode: number
}

export function successResponse<T>(data: T, message?: string, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: statusCode },
  )
}

export function errorResponse(error: string, statusCode = 500) {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status: statusCode },
  )
}

export function createdResponse<T>(data: T, message?: string) {
  return successResponse(data, message || "Created successfully", 201)
}

export function badRequestResponse(error: string) {
  return errorResponse(error, 400)
}

export function unauthorizedResponse(error = "Unauthorized") {
  return errorResponse(error, 401)
}

export function forbiddenResponse(error = "Forbidden") {
  return errorResponse(error, 403)
}

export function notFoundResponse(error = "Not found") {
  return errorResponse(error, 404)
}

export function conflictResponse(error = "Conflict") {
  return errorResponse(error, 409)
}
