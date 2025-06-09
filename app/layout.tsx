import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { ResumeProvider } from "@/lib/resume-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PrimeCV - Build Professional Resumes",
  description:
    "Create stunning, professional resumes with PrimeCV. Choose from multiple templates and download as PDF for free.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ResumeProvider>{children}</ResumeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
