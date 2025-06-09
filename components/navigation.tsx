"use client"

import { motion } from "framer-motion"
import { useResume } from "@/lib/resume-context"
import { ChevronLeft, ChevronRight, Home, Eye, Download } from "lucide-react"
import { AnimatedButton } from "./ui/animated-button"

const steps = ["Template", "Personal Info", "Experience", "Education", "Skills", "Projects", "Preview"]

export function Navigation() {
  const { state, dispatch } = useResume()
  const { currentStep, isPreviewMode } = state

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
    dispatch({ type: "SET_STEP", payload: 0 })
  }

  const togglePreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW" })
  }

  const handleDownload = () => {
    // PDF generation will be implemented
    window.print()
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-full px-6 py-3 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm" onClick={handleHome} className="rounded-full">
            <Home className="w-4 h-4" />
          </AnimatedButton>

          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </AnimatedButton>

          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-blue-500 w-8"
                    : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-600"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </AnimatedButton>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          <AnimatedButton variant="ghost" size="sm" onClick={togglePreview} className="rounded-full">
            <Eye className="w-4 h-4" />
          </AnimatedButton>

          <AnimatedButton
            variant="default"
            size="sm"
            onClick={handleDownload}
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Download className="w-4 h-4" />
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  )
}
