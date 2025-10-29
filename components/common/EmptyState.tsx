import type React from "react"
import { Package } from "lucide-react"

interface EmptyStateProps {
  title?: string
  message: string
  icon?: React.ReactNode
}

export function EmptyState({ title = "No Data", message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      {icon || <Package className="w-12 h-12 text-gray-400" />}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  )
}
