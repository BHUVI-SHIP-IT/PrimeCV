"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ExternalLink, Lightbulb } from "lucide-react"
import { useState } from "react"

export function FeedbackBanner() {
  const [isVisible, setIsVisible] = useState(true)

  // Your actual Google Form URL
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdeI21NmletXB-3exHZ6NiCTdxyaxx9KNqU9CTn4Gnc1Wttcg/viewform?usp=dialog"

  // Form is now ready!
  const FORM_IS_READY = true

  const handleFeedbackClick = () => {
    window.open(GOOGLE_FORM_URL, "_blank")
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs font-bold">
              🚀 PROTOTYPE v1.0
            </Badge>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">
                This is our first prototype! Your feedback helps us improve PrimeCV.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleFeedbackClick}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 border border-white/30 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Share Feedback
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
