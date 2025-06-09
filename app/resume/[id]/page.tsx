"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { loadResumeData, getResumeMetadata, cleanupExpiredResumes } from "@/lib/resume-sharing"
import { generatePDF } from "@/lib/pdf-generator"
import type { ResumeState } from "@/lib/resume-context"
import { Download, ArrowLeft, Share2, FileText, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SharedResumePage() {
  const params = useParams()
  const resumeId = params.id as string
  const [resumeData, setResumeData] = useState<ResumeState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState({ title: "", description: "" })

  useEffect(() => {
    const loadResume = async () => {
      try {
        // Clean up expired resumes first
        cleanupExpiredResumes()

        // Load the specific resume
        const data = await loadResumeData(resumeId)
        if (!data) {
          setError("Resume not found or has expired")
          return
        }

        setResumeData(data)
        setMetadata(getResumeMetadata(resumeId))
      } catch (err) {
        console.error("Error loading resume:", err)
        setError("Failed to load resume")
      } finally {
        setLoading(false)
      }
    }

    if (resumeId) {
      loadResume()
    }
  }, [resumeId])

  const handleDownload = async () => {
    if (!resumeData) return

    try {
      await generatePDF(resumeData)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const shareResume = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: metadata.title,
          text: metadata.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      } catch (error) {
        console.error("Failed to copy:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Resume...</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch the resume data</p>
        </motion.div>
      </div>
    )
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resume Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "This resume link may have expired or been removed."}
          </p>
          <div className="space-y-3">
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Create Your Resume
              </Button>
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span>Shared resumes expire after 7 days</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Your privacy is protected</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white">PrimeCV</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">by Bhuvaneswar</span>
              </div>
            </Link>

            {/* Resume Info */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {resumeData.personalInfo.fullName || "Professional Resume"}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Badge variant="secondary" className="text-xs">
                    Shared Resume
                  </Badge>
                  <span>•</span>
                  <span>Created with PrimeCV</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={shareResume} className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleDownload}
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-4"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Resume Content */}
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {/* Create a mock context for the resume preview */}
            <div className="shadow-2xl bg-white rounded-lg overflow-hidden">
              <ResumePreviewContent resumeData={resumeData} />
            </div>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 space-y-4"
          >
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Privacy Protected</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Expires in 7 days</span>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="rounded-full">
                Create Your Own Resume with PrimeCV
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

// Component to render resume content without context
function ResumePreviewContent({ resumeData }: { resumeData: ResumeState }) {
  const { personalInfo, experiences, education, skills, projects, selectedTemplate, customization } = resumeData

  // Get font size classes
  const getFontSizeClasses = () => {
    switch (customization.fontSize) {
      case "small":
        return {
          title: "text-2xl",
          heading: "text-lg",
          subheading: "text-base",
          body: "text-sm",
          small: "text-xs",
        }
      case "large":
        return {
          title: "text-4xl",
          heading: "text-xl",
          subheading: "text-lg",
          body: "text-base",
          small: "text-sm",
        }
      default: // medium
        return {
          title: "text-3xl",
          heading: "text-lg",
          subheading: "text-base",
          body: "text-sm",
          small: "text-xs",
        }
    }
  }

  const fontSizes = getFontSizeClasses()

  // Render template based on selection
  const renderTemplate = () => {
    const templateProps = { state: resumeData, fontSizes, customization }

    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate {...templateProps} />
      case "tech":
        return <TechTemplate {...templateProps} />
      case "elegant":
        return <ElegantTemplate {...templateProps} />
      default:
        return <ModernTemplate {...templateProps} />
    }
  }

  return (
    <div
      style={{
        fontFamily: customization.fontFamily,
        color: customization.textColor,
      }}
    >
      {renderTemplate()}
    </div>
  )
}

// Simplified template components (you can copy from resume-preview.tsx)
function ModernTemplate({ state, fontSizes, customization }: any) {
  // Copy the ModernTemplate implementation from resume-preview.tsx
  // Make sure to include clickable links
  return <div>Modern Template Content</div>
}

function TechTemplate({ state, fontSizes, customization }: any) {
  // Copy the TechTemplate implementation from resume-preview.tsx
  return <div>Tech Template Content</div>
}

function ElegantTemplate({ state, fontSizes, customization }: any) {
  // Copy the ElegantTemplate implementation from resume-preview.tsx
  return <div>Elegant Template Content</div>
}
