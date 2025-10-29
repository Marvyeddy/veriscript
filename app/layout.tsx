import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/components/providers/query-provider"

const Jarkata = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
})

const DM = DM_Sans({
  variable: "--font-DM_Sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Veriscript",
  description: "Debunk wrong prescriptions",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check for the token cookie
  // const token = cookies().get("token");
  // if (!token) {
  //   redirect("/onboarding/register");
  // }
  return (
    <html lang="en">
      <body className={`${Jarkata.variable} ${DM.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
