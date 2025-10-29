"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useCurrentUser } from "@/hooks/use-auth"
import { Spinner } from "@/components/ui/spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "patient" | "doctor" | "pharmacist"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter()
  const { data: user, isLoading } = useCurrentUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    } else if (requiredRole && user && user.userType !== requiredRole) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router, requiredRole])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole && user.userType !== requiredRole) {
    return null
  }

  return <>{children}</>
}
