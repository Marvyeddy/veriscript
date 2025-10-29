"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface User {
  _id: string
  fullName: string
  email: string
  userType: string
  phone?: string
  isVerified?: boolean
  verificationStatus?: string
  createdAt: string
  isOnline?: boolean
  lastOnline?: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  useEffect(() => {
    if (user?.userType !== "admin") {
      router.push("/dashboard")
      return
    }

    fetchUsers()
  }, [user, router])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (userId: string, userType: string, isVerified: boolean) => {
    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userType, isVerified }),
      })

      if (!response.ok) throw new Error("Failed to verify user")

      toast({
        title: "Success",
        description: `User ${isVerified ? "verified" : "unverified"} successfully`,
      })

      fetchUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update verification status",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || u.userType === filterType
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: users.length,
    doctors: users.filter((u) => u.userType === "doctor").length,
    pharmacists: users.filter((u) => u.userType === "pharmacist").length,
    patients: users.filter((u) => u.userType === "patient").length,
    verified: users.filter((u) => u.isVerified).length,
    online: users.filter((u) => u.isOnline).length,
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Doctors</p>
          <p className="text-2xl font-bold">{stats.doctors}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Pharmacists</p>
          <p className="text-2xl font-bold">{stats.pharmacists}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Patients</p>
          <p className="text-2xl font-bold">{stats.patients}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Verified</p>
          <p className="text-2xl font-bold">{stats.verified}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Online</p>
          <p className="text-2xl font-bold text-green-600">{stats.online}</p>
        </Card>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={filterType} onValueChange={setFilterType}>
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="doctor">Doctors</TabsTrigger>
            <TabsTrigger value="pharmacist">Pharmacists</TabsTrigger>
            <TabsTrigger value="patient">Patients</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">No users found</Card>
        ) : (
          filteredUsers.map((u) => (
            <Card key={u._id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{u.fullName}</h3>
                  <p className="text-sm text-gray-600">{u.email}</p>
                  {u.phone && <p className="text-sm text-gray-600">Phone: {u.phone}</p>}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{u.userType}</Badge>
                    {u.isOnline ? (
                      <Badge className="bg-green-500">Online</Badge>
                    ) : (
                      <Badge variant="secondary">Offline</Badge>
                    )}
                    {u.isVerified && <Badge variant="default">Verified</Badge>}
                  </div>
                  {!u.isOnline && u.lastOnline && (
                    <p className="text-xs text-gray-500 mt-2">
                      Last online: {new Date(u.lastOnline).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {(u.userType === "doctor" || u.userType === "pharmacist") && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleVerify(u._id, u.userType, true)} disabled={u.isVerified}>
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleVerify(u._id, u.userType, false)}
                      disabled={!u.isVerified}
                    >
                      Unverify
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
