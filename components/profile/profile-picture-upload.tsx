"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Image from "next/image"

interface ProfilePictureUploadProps {
  currentImage?: string
  onUploadSuccess?: (imageUrl: string) => void
}

export function ProfilePictureUpload({ currentImage, onUploadSuccess }: ProfilePictureUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload/profile-picture", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      })

      onUploadSuccess?.(data.profilePicture)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive",
      })
      setPreview(currentImage || null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        {preview ? (
          <Image src={preview || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Upload className="w-8 h-8" />
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      <Button onClick={() => fileInputRef.current?.click()} disabled={uploading} variant="outline" size="sm">
        {uploading ? "Uploading..." : "Upload Picture"}
      </Button>
    </div>
  )
}
