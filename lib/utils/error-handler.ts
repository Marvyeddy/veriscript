import { NextResponse } from "next/server"
import { AppError } from "@/lib/errors"

export function handleError(error: any) {
  console.error("[Error Handler]", error)

  if (error instanceof AppError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode })
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
  }

  return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
}

export function asyncHandler(fn: Function) {
  return async (...args: any[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      return handleError(error)
    }
  }
}
