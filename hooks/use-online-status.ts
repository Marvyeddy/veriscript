"use client"

import { useEffect, useCallback } from "react"
import { useAuth } from "./use-auth"

export function useOnlineStatus() {
  const { user } = useAuth()

  const updateOnlineStatus = useCallback(
    async (isOnline: boolean) => {
      if (!user) return

      try {
        await fetch("/api/user/online-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOnline }),
        })
      } catch (error) {
        console.error("Failed to update online status:", error)
      }
    },
    [user],
  )

  useEffect(() => {
    if (!user) return

    // Set online when component mounts
    updateOnlineStatus(true)

    // Set offline when user leaves
    const handleBeforeUnload = () => {
      updateOnlineStatus(false)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    // Update lastOnline periodically
    const interval = setInterval(() => {
      updateOnlineStatus(true)
    }, 30000) // Every 30 seconds

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      clearInterval(interval)
    }
  }, [user, updateOnlineStatus])

  return { updateOnlineStatus }
}
