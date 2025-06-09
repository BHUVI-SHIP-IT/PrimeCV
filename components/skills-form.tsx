"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useResume } from "@/lib/resume-context"
import { Zap, Plus, Trash2, Star } from "lucide-react"
import type { Skill } from "@/lib/types"
import { useState } from "react"

export function SkillsForm() {
  const { state, dispatch } = useResume()
  const { skills } = state
  const [newSkillName, setNewSkillName] = useState("")

  const addSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: newSkillName.trim(),
        level: 3,
      }
      dispatch({ type: "ADD_SKILL", payload: newSkill })
      setNewSkillName("")
    }
  }

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    dispatch({
      type: "UPDATE_SKILL",
      payload: { id, data: { [field]: value } },
    })
  }

  const removeSkill = (id: string) => {
    dispatch({ type: "REMOVE_SKILL", payload: id })
  }

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Basic"
      case 3:
        return "Intermediate"
      case 4:
        return "Advanced"
      case 5:
        return "Expert"
      default:
        return "Intermediate"
    }
  }

  const getSkillLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "text-red-500"
      case 2:
        return "text-orange-500"
      case 3:
        return "text-yellow-500"
      case 4:
        return "text-blue-500"
      case 5:
        return "text-green-500"
      default:
        return "text-yellow-500"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Skills & Expertise
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Showcase your technical and professional skills</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Professional Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Skill */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="newSkill">Add New Skill</Label>
                <Input
                  id="newSkill"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g., JavaScript, Project Management, Adobe Photoshop"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addSkill} disabled={!newSkillName.trim()} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Skill
                </Button>
              </div>
            </div>

            {/* Skills List */}
            {skills.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 dark:text-gray-400"
              >
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No skills added yet</p>
                <p className="text-sm">Add your first skill to get started</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Input
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                          className="font-semibold text-lg border-none bg-transparent p-0 focus:ring-0 focus:border-none"
                          placeholder="Skill name"
                        />
                        <Badge variant="outline" className={getSkillLevelColor(skill.level)}>
                          {getSkillLevelText(skill.level)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <Label>Proficiency Level</Label>
                      </div>
                      <div className="px-3">
                        <Slider
                          value={[skill.level]}
                          onValueChange={(value) => updateSkill(skill.id, "level", value[0])}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Beginner</span>
                          <span>Basic</span>
                          <span>Intermediate</span>
                          <span>Advanced</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Level Indicator */}
                    <div className="flex items-center gap-1 mt-4">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-8 h-2 rounded-full transition-all duration-300 ${
                            level <= skill.level
                              ? "bg-gradient-to-r from-blue-500 to-purple-600"
                              : "bg-gray-200 dark:bg-gray-600"
                          }`}
                        />
                      ))}
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
