"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { ResumeData, PersonalInfo, Experience, Education, Skill, Project, CustomizationOptions } from "./types"

interface ResumeState extends ResumeData {
  currentStep: number
  isPreviewMode: boolean
}

type ResumeAction =
  | { type: "SET_PERSONAL_INFO"; payload: PersonalInfo }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | { type: "UPDATE_EXPERIENCE"; payload: { id: string; data: Partial<Experience> } }
  | { type: "REMOVE_EXPERIENCE"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: { id: string; data: Partial<Education> } }
  | { type: "REMOVE_EDUCATION"; payload: string }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "UPDATE_SKILL"; payload: { id: string; data: Partial<Skill> } }
  | { type: "REMOVE_SKILL"; payload: string }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: { id: string; data: Partial<Project> } }
  | { type: "REMOVE_PROJECT"; payload: string }
  | { type: "SET_TEMPLATE"; payload: string }
  | { type: "SET_CUSTOMIZATION"; payload: Partial<CustomizationOptions> }
  | { type: "SET_STEP"; payload: number }
  | { type: "TOGGLE_PREVIEW" }
  | { type: "LOAD_DATA"; payload: ResumeData }

const initialState: ResumeState = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
    profileImage: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  selectedTemplate: "modern",
  customization: {
    fontSize: "medium",
    primaryColor: "#3B82F6",
    secondaryColor: "#6B7280",
    textColor: "#1F2937",
    fontFamily: "helvetica",
  },
  currentStep: -1, // Start with landing page
  isPreviewMode: false,
}

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case "SET_PERSONAL_INFO":
      return { ...state, personalInfo: action.payload }
    case "ADD_EXPERIENCE":
      return { ...state, experiences: [...state.experiences, action.payload] }
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experiences: state.experiences.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp,
        ),
      }
    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        experiences: state.experiences.filter((exp) => exp.id !== action.payload),
      }
    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload] }
    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu,
        ),
      }
    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
      }
    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.payload] }
    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill,
        ),
      }
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((skill) => skill.id !== action.payload),
      }
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] }
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? { ...project, ...action.payload.data } : project,
        ),
      }
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
      }
    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload }
    case "SET_CUSTOMIZATION":
      return { ...state, customization: { ...state.customization, ...action.payload } }
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "TOGGLE_PREVIEW":
      return { ...state, isPreviewMode: !state.isPreviewMode }
    case "LOAD_DATA":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const ResumeContext = createContext<{
  state: ResumeState
  dispatch: React.Dispatch<ResumeAction>
} | null>(null)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  // Save to localStorage whenever state changes (but not on landing page)
  useEffect(() => {
    if (state.currentStep >= 0) {
      const dataToSave = {
        personalInfo: state.personalInfo,
        experiences: state.experiences,
        education: state.education,
        skills: state.skills,
        projects: state.projects,
        selectedTemplate: state.selectedTemplate,
        customization: state.customization,
      }
      localStorage.setItem("resumeData", JSON.stringify(dataToSave))
    }
  }, [state])

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: "LOAD_DATA", payload: parsedData })
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  return <ResumeContext.Provider value={{ state, dispatch }}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
