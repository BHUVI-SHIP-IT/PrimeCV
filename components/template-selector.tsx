"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useResume } from "@/lib/resume-context"
import { templates } from "@/lib/templates"
import { Check, Sparkles, Camera } from "lucide-react"

export function TemplateSelector() {
  const { state, dispatch } = useResume()

  const handleTemplateSelect = (templateId: string) => {
    dispatch({ type: "SET_TEMPLATE", payload: templateId })

    // Navigate to the next step (Personal Info) after a short delay
    setTimeout(() => {
      dispatch({ type: "SET_STEP", payload: 1 })
    }, 500)
  }

  const categories = ["modern", "classic", "creative", "minimal"] as const

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose Your Template
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Select a professional template that matches your style and industry
          </p>
        </motion.div>

        {categories.map((category, categoryIndex) => {
          const categoryTemplates = templates.filter((t) => t.category === category)

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold capitalize text-gray-900 dark:text-gray-200">{category} Templates</h2>
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-gray-100 text-gray-700">
                  {categoryTemplates.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="cursor-pointer group"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <Card
                      className={`relative overflow-hidden transition-all duration-500 bg-white dark:bg-gray-900 border shadow-sm hover:shadow-xl ${
                        state.selectedTemplate === template.id
                          ? "ring-2 ring-blue-500 shadow-blue-500/25"
                          : "hover:shadow-gray-500/20 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                          <img
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.currentTarget.src = "/placeholder.svg?height=400&width=300"
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Photo Required Badge */}
                          {template.requiresPhoto && (
                            <div className="absolute top-4 left-4 bg-blue-500/90 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                              <Camera className="w-3 h-3" />
                              Photo Required
                            </div>
                          )}

                          {state.selectedTemplate === template.id && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg"
                            >
                              <Check className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">{template.name}</h3>
                            {template.requiresPhoto && <Camera className="w-5 h-5 text-blue-500 flex-shrink-0" />}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                            {template.description}
                          </p>
                          {template.requiresPhoto && (
                            <p className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                              This template works best with a profile photo
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
