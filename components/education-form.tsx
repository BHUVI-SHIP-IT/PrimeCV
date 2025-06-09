"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useResume } from "@/lib/resume-context"
import { GraduationCap, Plus, Trash2, School, Calendar, MapPin, Award } from "lucide-react"
import type { Education } from "@/lib/types"

export function EducationForm() {
  const { state, dispatch } = useResume()
  const { education } = state

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
      location: "",
    }
    dispatch({ type: "ADD_EDUCATION", payload: newEducation })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    dispatch({
      type: "UPDATE_EDUCATION",
      payload: { id, data: { [field]: value } },
    })
  }

  const removeEducation = (id: string) => {
    dispatch({ type: "REMOVE_EDUCATION", payload: id })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Education
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Add your educational background and qualifications</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-xl mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Educational Background
              </CardTitle>
              <Button onClick={addEducation} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {education.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 dark:text-gray-400"
              >
                <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No education added yet</p>
                <p className="text-sm">Click "Add Education" to get started</p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <School className="w-5 h-5" />
                        Education {index + 1}
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`} className="flex items-center gap-2">
                          <School className="w-4 h-4" />
                          Institution
                        </Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                          placeholder="University Name"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`} className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Degree
                        </Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Bachelor's, Master's, PhD, etc."
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${edu.id}`}
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                          placeholder="Computer Science, Business, etc."
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`graduationDate-${edu.id}`} className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Graduation Date
                        </Label>
                        <Input
                          id={`graduationDate-${edu.id}`}
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                          placeholder="May 2020"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`gpa-${edu.id}`} className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          GPA (Optional)
                        </Label>
                        <Input
                          id={`gpa-${edu.id}`}
                          value={edu.gpa || ""}
                          onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                          placeholder="3.8/4.0"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`location-${edu.id}`} className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </Label>
                        <Input
                          id={`location-${edu.id}`}
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                          placeholder="Boston, MA"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
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
