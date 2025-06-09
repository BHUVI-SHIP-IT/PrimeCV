"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useResume } from "@/lib/resume-context"
import { User, Mail, Phone, MapPin, Globe, Linkedin, Upload, X } from "lucide-react"
import { ModernCard } from "./modern-card"
import { ModernInput } from "./modern-input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { templates } from "@/lib/templates"
import { useRef } from "react"

export function PersonalInfoForm() {
  const { state, dispatch } = useResume()
  const { personalInfo, selectedTemplate } = state
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)
  const requiresPhoto = selectedTemplateData?.requiresPhoto || false

  const updatePersonalInfo = (field: keyof typeof personalInfo, value: string) => {
    dispatch({
      type: "SET_PERSONAL_INFO",
      payload: { ...personalInfo, [field]: value },
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        updatePersonalInfo("profileImage", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    updatePersonalInfo("profileImage", "")
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Personal Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Let's start with your basic information</p>
        </motion.div>

        <ModernCard
          title="Contact Information"
          subtitle="Enter your professional contact details"
          icon={<User className="w-6 h-6" />}
          delay={0.2}
        >
          {/* Profile Photo Upload */}
          {requiresPhoto && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
              <Label className="block text-lg font-medium mb-4">Profile Photo</Label>
              {personalInfo.profileImage ? (
                <div className="relative inline-block">
                  <img
                    src={personalInfo.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 border-4 border-dashed border-gray-300 dark:border-gray-600">
                    <Upload className="w-12 h-12 text-gray-400" />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                This template requires a profile photo for the best appearance
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ModernInput
              label="Full Name"
              icon={<User className="w-4 h-4" />}
              placeholder="John Doe"
              value={personalInfo.fullName}
              onChange={(value) => updatePersonalInfo("fullName", value)}
            />

            <ModernInput
              label="Email Address"
              icon={<Mail className="w-4 h-4" />}
              type="email"
              placeholder="john@example.com"
              value={personalInfo.email}
              onChange={(value) => updatePersonalInfo("email", value)}
            />

            <ModernInput
              label="Phone Number"
              icon={<Phone className="w-4 h-4" />}
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={personalInfo.phone}
              onChange={(value) => updatePersonalInfo("phone", value)}
            />

            <ModernInput
              label="Location"
              icon={<MapPin className="w-4 h-4" />}
              placeholder="New York, NY"
              value={personalInfo.location}
              onChange={(value) => updatePersonalInfo("location", value)}
            />

            <ModernInput
              label="Website"
              icon={<Globe className="w-4 h-4" />}
              type="url"
              placeholder="https://johndoe.com"
              value={personalInfo.website}
              onChange={(value) => updatePersonalInfo("website", value)}
            />

            <ModernInput
              label="LinkedIn"
              icon={<Linkedin className="w-4 h-4" />}
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              value={personalInfo.linkedin}
              onChange={(value) => updatePersonalInfo("linkedin", value)}
            />
          </div>

          <div className="mt-8">
            <ModernInput
              label="Professional Summary"
              placeholder="Write a compelling summary of your professional background, key achievements, and career objectives..."
              value={personalInfo.summary}
              onChange={(value) => updatePersonalInfo("summary", value)}
              rows={6}
            />
          </div>
        </ModernCard>
      </div>
    </div>
  )
}
