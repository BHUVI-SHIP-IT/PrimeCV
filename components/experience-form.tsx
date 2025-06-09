"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useResume } from "@/lib/resume-context"
import { Briefcase, Plus, Trash2, Building, Calendar, MapPin } from "lucide-react"
import type { Experience } from "@/lib/types"

export function ExperienceForm() {
  const { state, dispatch } = useResume()
  const { experiences } = state

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
    }
    dispatch({ type: "ADD_EXPERIENCE", payload: newExperience })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    dispatch({
      type: "UPDATE_EXPERIENCE",
      payload: { id, data: { [field]: value } },
    })
  }

  const removeExperience = (id: string) => {
    dispatch({ type: "REMOVE_EXPERIENCE", payload: id })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Work Experience
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Add your professional experience and achievements</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-xl mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Professional Experience
              </CardTitle>
              <Button onClick={addExperience} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Experience
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {experiences.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 dark:text-gray-400"
              >
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No work experience added yet</p>
                <p className="text-sm">Click "Add Experience" to get started</p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Experience {index + 1}
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeExperience(experience.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${experience.id}`} className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Company
                        </Label>
                        <Input
                          id={`company-${experience.id}`}
                          value={experience.company}
                          onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                          placeholder="Company Name"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`position-${experience.id}`} className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Position
                        </Label>
                        <Input
                          id={`position-${experience.id}`}
                          value={experience.position}
                          onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                          placeholder="Job Title"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${experience.id}`} className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Start Date
                        </Label>
                        <Input
                          id={`startDate-${experience.id}`}
                          value={experience.startDate}
                          onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                          placeholder="Jan 2020"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${experience.id}`} className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          End Date
                        </Label>
                        <Input
                          id={`endDate-${experience.id}`}
                          value={experience.endDate}
                          onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                          placeholder="Present"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`location-${experience.id}`} className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </Label>
                        <Input
                          id={`location-${experience.id}`}
                          value={experience.location}
                          onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                          placeholder="New York, NY"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${experience.id}`}>Job Description & Achievements</Label>
                      <Textarea
                        id={`description-${experience.id}`}
                        value={experience.description}
                        onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                        placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible&#10;• Highlight technologies and skills used"
                        rows={6}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
