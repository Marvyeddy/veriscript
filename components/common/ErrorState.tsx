"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  fullHeight?: boolean
}

export function ErrorState({ title = "Error", message, onRetry, fullHeight = false }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${fullHeight ? "min-h-screen" : "py-8"}`}>
      <AlertCircle className="w-12 h-12 text-red-500" />
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </div>
  )
}
