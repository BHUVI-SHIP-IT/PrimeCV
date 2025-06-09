import type { ResumeState } from "./resume-context"

// Generate a unique resume ID
export function generateResumeId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${randomStr}`
}

// Save resume data to localStorage with expiration (7 days)
export async function saveResumeData(resumeId: string, resumeData: ResumeState): Promise<void> {
  try {
    const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    const dataToSave = {
      resumeData,
      expirationTime,
      createdAt: Date.now(),
    }

    localStorage.setItem(`shared-resume-${resumeId}`, JSON.stringify(dataToSave))

    // Also save to a list of shared resumes for cleanup
    const sharedList = JSON.parse(localStorage.getItem("shared-resumes-list") || "[]")
    sharedList.push({ id: resumeId, createdAt: Date.now(), expirationTime })
    localStorage.setItem("shared-resumes-list", JSON.stringify(sharedList))

    console.log(`Resume saved with ID: ${resumeId}`)
  } catch (error) {
    console.error("Error saving resume data:", error)
    throw new Error("Failed to save resume data")
  }
}

// Load resume data by ID
export async function loadResumeData(resumeId: string): Promise<ResumeState | null> {
  try {
    const savedData = localStorage.getItem(`shared-resume-${resumeId}`)
    if (!savedData) {
      return null
    }

    const { resumeData, expirationTime } = JSON.parse(savedData)

    // Check if data has expired
    if (Date.now() > expirationTime) {
      localStorage.removeItem(`shared-resume-${resumeId}`)
      return null
    }

    return resumeData
  } catch (error) {
    console.error("Error loading resume data:", error)
    return null
  }
}

// Clean up expired shared resumes
export function cleanupExpiredResumes(): void {
  try {
    const sharedList = JSON.parse(localStorage.getItem("shared-resumes-list") || "[]")
    const currentTime = Date.now()

    const validResumes = sharedList.filter((resume: any) => {
      if (currentTime > resume.expirationTime) {
        localStorage.removeItem(`shared-resume-${resume.id}`)
        return false
      }
      return true
    })

    localStorage.setItem("shared-resumes-list", JSON.stringify(validResumes))
  } catch (error) {
    console.error("Error cleaning up expired resumes:", error)
  }
}

// Get resume metadata
export function getResumeMetadata(resumeId: string): { title: string; description: string } {
  try {
    const savedData = localStorage.getItem(`shared-resume-${resumeId}`)
    if (!savedData) {
      return {
        title: "Resume - PrimeCV",
        description: "Professional resume created with PrimeCV",
      }
    }

    const { resumeData } = JSON.parse(savedData)
    const fullName = resumeData.personalInfo?.fullName || "Professional"

    return {
      title: `${fullName}'s Resume - PrimeCV`,
      description: `Professional resume for ${fullName}, created with PrimeCV - Free Resume Builder`,
    }
  } catch (error) {
    return {
      title: "Resume - PrimeCV",
      description: "Professional resume created with PrimeCV",
    }
  }
}
