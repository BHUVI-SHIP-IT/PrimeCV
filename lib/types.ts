export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  summary: string
  profileImage?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  location: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
  gpa?: string
  location: string
}

export interface Skill {
  id: string
  name: string
  level: number
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

export interface CustomizationOptions {
  fontSize: "small" | "medium" | "large"
  primaryColor: string
  secondaryColor: string
  textColor: string
  fontFamily: "helvetica" | "times" | "courier"
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  selectedTemplate: string
  customization: CustomizationOptions
}

export interface Template {
  id: string
  name: string
  description: string
  image: string
  category: "modern" | "classic" | "creative" | "minimal"
  requiresPhoto: boolean
}
