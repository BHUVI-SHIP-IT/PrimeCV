"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useResume } from "@/lib/resume-context"
import { Palette, Type, Upload, X } from "lucide-react"
import { templates } from "@/lib/templates"
import { useRef } from "react"
// Add the import for the debug utility
import { testImageLoading } from "@/lib/debug-utils"

const colorPresets = [
  { name: "Blue", primary: "#3B82F6", secondary: "#6B7280" },
  { name: "Green", primary: "#10B981", secondary: "#6B7280" },
  { name: "Purple", primary: "#8B5CF6", secondary: "#6B7280" },
  { name: "Red", primary: "#EF4444", secondary: "#6B7280" },
  { name: "Orange", primary: "#F97316", secondary: "#6B7280" },
  { name: "Teal", primary: "#14B8A6", secondary: "#6B7280" },
  { name: "Pink", primary: "#EC4899", secondary: "#6B7280" },
  { name: "Indigo", primary: "#6366F1", secondary: "#6B7280" },
]

const fontSizes = [
  { name: "Small", value: "small" as const },
  { name: "Medium", value: "medium" as const },
  { name: "Large", value: "large" as const },
]

const fontFamilies = [
  { name: "Helvetica", value: "helvetica" as const },
  { name: "Times", value: "times" as const },
  { name: "Courier", value: "courier" as const },
]

export function CustomizationPanel() {
  const { state, dispatch } = useResume()
  const { customization, selectedTemplate, personalInfo } = state
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)
  const requiresPhoto = selectedTemplateData?.requiresPhoto || false

  const updateCustomization = (updates: Partial<typeof customization>) => {
    dispatch({ type: "SET_CUSTOMIZATION", payload: updates })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        dispatch({
          type: "SET_PERSONAL_INFO",
          payload: { ...personalInfo, profileImage: imageUrl },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    dispatch({
      type: "SET_PERSONAL_INFO",
      payload: { ...personalInfo, profileImage: "" },
    })
  }

  // Add this function inside the CustomizationPanel component, before the return statement
  const testImageForPdf = async () => {
    if (!personalInfo.profileImage) {
      alert("No profile image to test")
      return
    }

    try {
      const result = await testImageLoading(personalInfo.profileImage)
      if (result.success) {
        alert(`Image test successful: ${result.message}`)
      } else {
        alert(`Image test failed: ${result.message}`)
      }
    } catch (error) {
      alert(`Error testing image: ${error}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-20 w-80 max-h-[calc(100vh-100px)] overflow-y-auto z-40"
    >
      <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Customize Resume
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photo Upload */}
          {requiresPhoto && (
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Profile Photo
              </Label>
              {personalInfo.profileImage ? (
                <div className="relative">
                  <img
                    src={personalInfo.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-3 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                    Upload Photo
                  </Button>
                  {personalInfo.profileImage && (
                    <Button variant="outline" size="sm" onClick={testImageForPdf} className="mt-2 text-xs">
                      Test Image for PDF
                    </Button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          )}

          {/* Color Presets */}
          <div className="space-y-3">
            <Label>Color Theme</Label>
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() =>
                    updateCustomization({
                      primaryColor: preset.primary,
                      secondaryColor: preset.secondary,
                    })
                  }
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    customization.primaryColor === preset.primary
                      ? "border-gray-800 dark:border-white scale-110"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: preset.primary }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="space-y-3">
            <Label>Custom Colors</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm w-20">Primary:</Label>
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => updateCustomization({ primaryColor: e.target.value })}
                  className="w-12 h-8 rounded border"
                />
                <span className="text-xs text-gray-500">{customization.primaryColor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm w-20">Secondary:</Label>
                <input
                  type="color"
                  value={customization.secondaryColor}
                  onChange={(e) => updateCustomization({ secondaryColor: e.target.value })}
                  className="w-12 h-8 rounded border"
                />
                <span className="text-xs text-gray-500">{customization.secondaryColor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm w-20">Text:</Label>
                <input
                  type="color"
                  value={customization.textColor}
                  onChange={(e) => updateCustomization({ textColor: e.target.value })}
                  className="w-12 h-8 rounded border"
                />
                <span className="text-xs text-gray-500">{customization.textColor}</span>
              </div>
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Font Size
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes.map((size) => (
                <Button
                  key={size.value}
                  variant={customization.fontSize === size.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateCustomization({ fontSize: size.value })}
                  className="text-xs"
                >
                  {size.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-3">
            <Label>Font Family</Label>
            <div className="space-y-2">
              {fontFamilies.map((font) => (
                <Button
                  key={font.value}
                  variant={customization.fontFamily === font.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateCustomization({ fontFamily: font.value })}
                  className="w-full justify-start"
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
