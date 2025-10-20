import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

const Jarkata = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const DM = DM_Sans({
  variable: "--font-DM_Sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veriscript",
  description: "Debunk wrong prescriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Jarkata.variable} ${DM.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
