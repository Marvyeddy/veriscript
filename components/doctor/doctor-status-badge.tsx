import { formatDistanceToNow } from "date-fns"

interface DoctorStatusBadgeProps {
  isOnline: boolean
  lastOnline?: Date | string
}

export function DoctorStatusBadge({ isOnline, lastOnline }: DoctorStatusBadgeProps) {
  const lastOnlineDate = lastOnline ? new Date(lastOnline) : null

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
      <span className="text-sm">
        {isOnline ? (
          <span className="text-green-600 font-medium">Online</span>
        ) : lastOnlineDate ? (
          <span className="text-gray-600">Last online {formatDistanceToNow(lastOnlineDate, { addSuffix: true })}</span>
        ) : (
          <span className="text-gray-600">Offline</span>
        )}
      </span>
    </div>
  )
}
