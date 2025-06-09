"use client"

import { motion } from "framer-motion"
import { useResume } from "@/lib/resume-context"
import { ChevronLeft, ChevronRight, Eye, Download, FileText, Home, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { generatePDF } from "@/lib/pdf-generator"
import { ShareModal } from "@/components/share-modal"
import { useState } from "react"

const steps = [
  { id: 0, name: "Template", short: "Template" },
  { id: 1, name: "Personal Info", short: "Personal" },
  { id: 2, name: "Experience", short: "Work" },
  { id: 3, name: "Education", short: "Education" },
  { id: 4, name: "Skills", short: "Skills" },
  { id: 5, name: "Projects", short: "Projects" },
  { id: 6, name: "Preview", short: "Preview" },
]

export function TopNavigation() {
  const { state, dispatch } = useResume()
  const { currentStep, isPreviewMode } = state
  const [showShareModal, setShowShareModal] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch({ type: "SET_STEP", payload: currentStep + 1 })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      dispatch({ type: "SET_STEP", payload: currentStep - 1 })
    }
  }

  const handleHome = () => {
    dispatch({ type: "SET_STEP", payload: -1 })
  }

  const togglePreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW" })
  }

  const handleDownload = async () => {
    try {
      await generatePDF(state)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const goToStep = (stepIndex: number) => {
    dispatch({ type: "SET_STEP", payload: stepIndex })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleHome}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">PrimeCV</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors">by Bhuvaneswar</span>
            </div>
          </motion.div>

          {/* Step Indicators */}
          <div className="hidden md:flex items-center gap-2">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  index === currentStep
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                    : index < currentStep
                      ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {step.short}
              </motion.button>
            ))}
          </div>

          {/* Mobile Step Indicator */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors">
              {currentStep + 1} / {steps.length}
            </span>
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentStep
                      ? "bg-gray-900 dark:bg-white w-6"
                      : index < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePreview}
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Button>

            {/* Share Button */}
            <Button
              onClick={() => setShowShareModal(true)}
              variant="ghost"
              size="sm"
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </Button>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              size="sm"
              className="rounded-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-sm px-4 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>

            {/* Home Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHome}
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Home className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* Share Modal */}
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    </motion.nav>
  )
}
