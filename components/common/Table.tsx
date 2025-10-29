"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, MoreVerticalIcon } from "lucide-react"
import { usePrescriptions } from "@/hooks/use-prescriptions"
import { Spinner } from "@/components/ui/spinner"

interface PrescriptionTableProps {
  userId?: string
}

export default function PrescriptionTable({ userId }: PrescriptionTableProps) {
  const { data: prescriptions = [], isLoading } = usePrescriptions(userId)

  if (isLoading) {
    return (
      <div className="rounded-[8px] bg-white p-4 flex items-center justify-center min-h-[200px]">
        <Spinner />
      </div>
    )
  }

  const displayPrescriptions =
    prescriptions.length > 0
      ? prescriptions
      : [
          {
            id: "RX001",
            doctorName: "Dr. Sarah Connor",
            date: "2025-10-20",
            medications: [{ name: "Aspirin", dosage: "500mg", frequency: "2x daily", duration: "7 days" }],
            status: "active",
            notes: "Take with food",
          },
          {
            id: "RX002",
            doctorName: "Dr. John Doe",
            date: "2025-10-18",
            medications: [{ name: "Ibuprofen", dosage: "200mg", frequency: "3x daily", duration: "5 days" }],
            status: "active",
            notes: "As needed for pain",
          },
        ]

  return (
    <div className="rounded-[8px] bg-white p-2 sm:p-4">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="!border-0">
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead className="text-sm">S/N</TableHead>
              <TableHead className="text-sm">Doctor</TableHead>
              <TableHead className="text-sm">Date</TableHead>
              <TableHead className="text-sm">Prescription ID</TableHead>
              <TableHead className="text-sm">Status</TableHead>
              <TableHead>
                <MoreVerticalIcon className="h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="rounded-[8px] font-medium font-sans">
            {displayPrescriptions.map((item, index) => (
              <TableRow key={item.id} className="!border-0">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="text-sm">{index + 1}</TableCell>
                <TableCell className="text-sm">{item.doctorName}</TableCell>
                <TableCell className="text-sm">{item.date}</TableCell>
                <TableCell className="text-sm">{item.id}</TableCell>
                <TableCell>
                  {item.status === "completed" && (
                    <Badge className="bg-[#EAEDFF] hover:opacity-20 text-[#2C4BFD] px-3 py-1 text-xs rounded-full">
                      Dispensed
                    </Badge>
                  )}
                  {item.status === "active" && (
                    <Badge className="bg-[#FFF0E5] hover:opacity-20 text-[#FE7500] px-3 py-1 text-xs rounded-full">
                      Active
                    </Badge>
                  )}
                  {item.status === "expired" && (
                    <Badge className="bg-[#FFE5E5] hover:opacity-20 text-[#FF0000] px-3 py-1 text-xs rounded-full">
                      Expired
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <MoreVertical className="h-4 w-4 text-gray-600 hover:text-green-600 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {displayPrescriptions.map((item, index) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
              </div>
              <MoreVertical className="h-4 w-4 text-gray-600 hover:text-green-600 cursor-pointer" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Doctor:</span>
                <span className="text-sm font-medium text-gray-900">{item.doctorName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Date:</span>
                <span className="text-sm font-medium text-gray-900">{item.date}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Prescription ID:</span>
                <span className="text-sm font-medium text-gray-900">{item.id}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Status:</span>
                {item.status === "completed" && (
                  <Badge className="bg-[#EAEDFF] hover:opacity-20 text-[#2C4BFD] px-3 py-1 text-xs rounded-full">
                    Dispensed
                  </Badge>
                )}
                {item.status === "active" && (
                  <Badge className="bg-[#FFF0E5] hover:opacity-20 text-[#FE7500] px-3 py-1 text-xs rounded-full">
                    Active
                  </Badge>
                )}
                {item.status === "expired" && (
                  <Badge className="bg-[#FFE5E5] hover:opacity-20 text-[#FF0000] px-3 py-1 text-xs rounded-full">
                    Expired
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
