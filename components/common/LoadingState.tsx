import { Spinner } from "@/components/ui/spinner"

interface LoadingStateProps {
  message?: string
  fullHeight?: boolean
}

export function LoadingState({ message = "Loading...", fullHeight = false }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${fullHeight ? "min-h-screen" : "py-8"}`}>
      <Spinner />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  )
}
