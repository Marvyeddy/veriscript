"use client"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { ProfilePictureUpload } from "@/components/profile/profile-picture-upload"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface UserProfile {
  _id: string
  fullName: string
  email: string
  phone?: string
  profilePicture?: string
  userType: string
  isVerified?: boolean
  location?: {
    latitude: number
    longitude: number
  }
  isOnline?: boolean
  lastOnline?: string
}

const ProfilePage = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (!response.ok) throw new Error("Failed to fetch profile")
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatLastOnline = (lastOnline?: string) => {
    if (!lastOnline) return "Never"
    const date = new Date(lastOnline)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-40 w-full mb-6" />
      </div>
    )
  }

  if (!profile) return <div className="p-8">Profile not found</div>

  return (
    <section className="relative h-full">
      <div className="px-4 sm:px-[30px] pt-4 sm:pt-[22px] font-jakarta max-h-[calc(100vh-100px)] overflow-y-auto pb-10">
        <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#4D4D4D] mb-4 sm:mb-[20px]">Profile</h2>

        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <ProfilePictureUpload currentImage={profile.profilePicture} onUploadSuccess={() => fetchProfile()} />
            </div>

            <div className="flex-1">
              <h1 className="font-semibold text-lg mb-2">{profile.fullName}</h1>
              <p className="text-sm text-gray-600 mb-2">{profile.email}</p>
              {profile.phone && <p className="text-sm text-gray-600 mb-4">Phone: {profile.phone}</p>}

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{profile.userType}</Badge>
                {profile.isVerified && <Badge variant="default">Verified</Badge>}
                {profile.isOnline ? (
                  <Badge className="bg-green-500">Online</Badge>
                ) : (
                  <Badge variant="secondary">Offline</Badge>
                )}
              </div>

              {!profile.isOnline && profile.lastOnline && (
                <p className="text-xs text-gray-500">Last online: {formatLastOnline(profile.lastOnline)}</p>
              )}
            </div>
          </div>
        </Card>

        {profile.location && (
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-3">Location</h3>
            <p className="text-sm text-gray-600 mb-3">
              Latitude: {profile.location.latitude.toFixed(4)}, Longitude: {profile.location.longitude.toFixed(4)}
            </p>
            <a
              href={`https://www.google.com/maps?q=${profile.location.latitude},${profile.location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              View on Google Maps
            </a>
          </Card>
        )}

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Account Information</h3>
          <Separator className="mb-4" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Account Type:</span>
              <span className="font-medium capitalize">{profile.userType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium">{profile.isVerified ? "Verified" : "Pending Verification"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{profile.email}</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default ProfilePage
