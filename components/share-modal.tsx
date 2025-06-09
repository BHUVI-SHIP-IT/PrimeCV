"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useResume } from "@/lib/resume-context"
import { Share2, Copy, Check, X, Globe, QrCode, Facebook, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { generateResumeId, saveResumeData } from "@/lib/resume-sharing"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { state } = useResume()
  const [shareUrl, setShareUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const generateShareLink = async () => {
    setIsGenerating(true)
    try {
      const resumeId = generateResumeId()
      await saveResumeData(resumeId, state)
      const url = `${window.location.origin}/resume/${resumeId}`
      setShareUrl(url)
    } catch (error) {
      console.error("Error generating share link:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const shareToSocial = (platform: string) => {
    const text = `Check out my professional resume created with PrimeCV!`
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent("My Professional Resume")}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${shareUrl}`)}`,
    }

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share Resume</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create a shareable link</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Generate Link Section */}
            {!shareUrl ? (
              <div className="text-center py-8">
                <Globe className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Create Public Resume Link</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  Generate a public link that anyone can view without downloading
                </p>
                <Button
                  onClick={generateShareLink}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Globe className="w-4 h-4 mr-2" />
                  )}
                  {isGenerating ? "Generating..." : "Generate Link"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Share URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Public Resume URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={shareUrl}
                      readOnly
                      className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                    <Button onClick={copyToClipboard} variant="outline" size="sm" className="px-3">
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-green-600 dark:text-green-400 mt-1"
                    >
                      ✓ Copied to clipboard!
                    </motion.p>
                  )}
                </div>

                {/* Features */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🌟 Share Features</h4>
                  <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                      <span>Clickable links (email, phone, website, LinkedIn)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                      <span>Mobile-responsive design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                      <span>Professional formatting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                      <span>Download PDF option</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">QR Code</span>
                  <Button variant="outline" size="sm" onClick={() => setShowQR(!showQR)} className="rounded-full">
                    <QrCode className="w-4 h-4 mr-2" />
                    {showQR ? "Hide" : "Show"} QR
                  </Button>
                </div>

                {showQR && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center"
                  >
                    <img
                      src={generateQRCode() || "/placeholder.svg"}
                      alt="QR Code"
                      className="mx-auto rounded-lg shadow-md"
                      width={150}
                      height={150}
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Scan to view resume</p>
                  </motion.div>
                )}

                {/* Social Sharing */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Share on Social Media</h4>
                  <div className="grid grid-cols-5 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareToSocial("linkedin")}
                      className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Linkedin className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareToSocial("twitter")}
                      className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Twitter className="w-4 h-4 text-blue-400" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareToSocial("facebook")}
                      className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Facebook className="w-4 h-4 text-blue-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareToSocial("email")}
                      className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareToSocial("whatsapp")}
                      className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open(shareUrl, "_blank")}
                    className="flex-1 rounded-full"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full"
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
