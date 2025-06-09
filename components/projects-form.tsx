"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useResume } from "@/lib/resume-context"
import { FolderOpen, Plus, Trash2, ExternalLink, Github, Tag, X } from "lucide-react"
import type { Project } from "@/lib/types"
import { useState } from "react"

export function ProjectsForm() {
  const { state, dispatch } = useResume()
  const { projects } = state

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
    }
    dispatch({ type: "ADD_PROJECT", payload: newProject })
  }

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    dispatch({
      type: "UPDATE_PROJECT",
      payload: { id, data: { [field]: value } },
    })
  }

  const removeProject = (id: string) => {
    dispatch({ type: "REMOVE_PROJECT", payload: id })
  }

  const addTechnology = (projectId: string, technology: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (project && technology.trim() && !project.technologies.includes(technology.trim())) {
      const updatedTechnologies = [...project.technologies, technology.trim()]
      updateProject(projectId, "technologies", updatedTechnologies)
    }
  }

  const removeTechnology = (projectId: string, technology: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      const updatedTechnologies = project.technologies.filter((tech) => tech !== technology)
      updateProject(projectId, "technologies", updatedTechnologies)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Projects & Portfolio
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Showcase your best work and personal projects</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-xl mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Featured Projects
              </CardTitle>
              <Button onClick={addProject} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 dark:text-gray-400"
              >
                <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No projects added yet</p>
                <p className="text-sm">Click "Add Project" to showcase your work</p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onUpdate={updateProject}
                    onRemove={removeProject}
                    onAddTechnology={addTechnology}
                    onRemoveTechnology={removeTechnology}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  onUpdate: (id: string, field: keyof Project, value: string | string[]) => void
  onRemove: (id: string) => void
  onAddTechnology: (projectId: string, technology: string) => void
  onRemoveTechnology: (projectId: string, technology: string) => void
}

function ProjectCard({ project, index, onUpdate, onRemove, onAddTechnology, onRemoveTechnology }: ProjectCardProps) {
  const [newTech, setNewTech] = useState("")

  const handleAddTechnology = () => {
    if (newTech.trim()) {
      onAddTechnology(project.id, newTech)
      setNewTech("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Project {index + 1}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemove(project.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor={`name-${project.id}`}>Project Name</Label>
          <Input
            id={`name-${project.id}`}
            value={project.name}
            onChange={(e) => onUpdate(project.id, "name", e.target.value)}
            placeholder="My Awesome Project"
            className="transition-all duration-300 focus:scale-105"
          />
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <Label htmlFor={`description-${project.id}`}>Description</Label>
          <Textarea
            id={`description-${project.id}`}
            value={project.description}
            onChange={(e) => onUpdate(project.id, "description", e.target.value)}
            placeholder="Describe your project, its purpose, key features, and your role in its development..."
            rows={4}
            className="transition-all duration-300 focus:scale-105"
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor={`link-${project.id}`} className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Live Demo URL
            </Label>
            <Input
              id={`link-${project.id}`}
              value={project.link || ""}
              onChange={(e) => onUpdate(project.id, "link", e.target.value)}
              placeholder="https://myproject.com"
              type="url"
              className="transition-all duration-300 focus:scale-105"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`github-${project.id}`} className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub Repository
            </Label>
            <Input
              id={`github-${project.id}`}
              value={project.github || ""}
              onChange={(e) => onUpdate(project.id, "github", e.target.value)}
              placeholder="https://github.com/username/project"
              type="url"
              className="transition-all duration-300 focus:scale-105"
            />
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Technologies Used
          </Label>

          {/* Add Technology */}
          <div className="flex gap-2">
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB"
              onKeyPress={(e) => e.key === "Enter" && handleAddTechnology()}
              className="flex-1"
            />
            <Button onClick={handleAddTechnology} disabled={!newTech.trim()} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Technology Tags */}
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <button
                    onClick={() => onRemoveTechnology(project.id, tech)}
                    className="ml-1 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
