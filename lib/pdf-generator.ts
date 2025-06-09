import jsPDF from "jspdf"
import type { ResumeState } from "./resume-context"
import { templates } from "./templates"

// Add this function at the top of the file, after the imports
// Debug function to log PDF generation steps
function logPdfStep(step: string, details?: any) {
  console.log(`PDF Generation - ${step}`, details || "")
}

// Update the image format detection in the getImageAsBase64 function
async function getImageAsBase64(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's already a data URL, return it directly
    if (imageUrl.startsWith("data:")) {
      resolve(imageUrl)
      return
    }

    // For regular URLs, load the image and convert to data URL
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0)

        // Get the data URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9)
        console.log("Image converted to data URL successfully")
        resolve(dataUrl)
      } catch (error) {
        console.error("Error converting image to base64:", error)
        reject(error)
      }
    }
    img.onerror = (error) => {
      console.error("Error loading image:", error)
      reject(new Error("Failed to load image"))
    }
    img.src = imageUrl
  })
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

// Get font sizes based on customization
function getFontSizes(fontSize: string) {
  switch (fontSize) {
    case "small":
      return { title: 20, heading: 14, subheading: 12, body: 10, small: 8 }
    case "large":
      return { title: 28, heading: 18, subheading: 16, body: 14, small: 12 }
    default: // medium
      return { title: 24, heading: 16, subheading: 14, body: 12, small: 10 }
  }
}

// Generate PDF based on template
export async function generatePDF(resumeData: ResumeState) {
  logPdfStep("Starting PDF generation", { template: resumeData.selectedTemplate })

  const templateId = resumeData.selectedTemplate
  const template = templates.find((t) => t.id === templateId) || templates[0]

  // Log if profile image is present
  if (resumeData.personalInfo.profileImage) {
    logPdfStep("Profile image found", {
      imageStart: resumeData.personalInfo.profileImage.substring(0, 30) + "...",
      isDataUrl: resumeData.personalInfo.profileImage.startsWith("data:"),
    })
  } else {
    logPdfStep("No profile image found")
  }

  // Choose the appropriate PDF generator based on template
  try {
    switch (templateId) {
      case "tech":
        return generateTechPDF(resumeData)
      case "modern":
        return generateModernPDF(resumeData)
      case "elegant":
        return generateElegantPDF(resumeData)
      case "classic":
        return generateClassicPDF(resumeData)
      case "bold":
        return generateBoldPDF(resumeData)
      case "professional":
        return generateProfessionalPDF(resumeData)
      case "minimal":
        return generateMinimalPDF(resumeData)
      case "creative":
        return generateCreativePDF(resumeData)
      case "clean":
        return generateCleanPDF(resumeData)
      default:
        return generateModernPDF(resumeData)
    }
  } catch (error) {
    logPdfStep("Error generating PDF", error)
    throw error
  }
}

// Update the addImage calls in the PDF generation functions to handle different image formats
// For example, in the Tech template:
// Detect image format from data URL
const getImageFormat = (dataUrl: string): string => {
  if (dataUrl.includes("data:image/jpeg")) return "JPEG"
  if (dataUrl.includes("data:image/png")) return "PNG"
  if (dataUrl.includes("data:image/gif")) return "GIF"
  return "JPEG" // Default
}

// Tech Template PDF - Matching the dark sidebar design
async function generateTechPDF(resumeData: ResumeState) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const sidebarWidth = 70
  const mainContentStart = sidebarWidth + 5
  const mainContentWidth = pageWidth - mainContentStart - 10
  const fontSizes = getFontSizes(resumeData.customization.fontSize)
  const primaryColor = hexToRgb(resumeData.customization.primaryColor)

  let sidebarY = 20
  let mainY = 20

  try {
    // Dark sidebar background
    pdf.setFillColor(33, 37, 41) // Dark gray
    pdf.rect(0, 0, sidebarWidth, pageHeight, "F")

    // Profile section in sidebar
    if (resumeData.personalInfo.profileImage) {
      try {
        const imageBase64 = await getImageAsBase64(resumeData.personalInfo.profileImage)
        const imgSize = 35
        const imgX = (sidebarWidth - imgSize) / 2

        // Add rounded background for image
        pdf.setFillColor(20, 184, 166) // Teal color
        pdf.roundedRect(imgX - 2, sidebarY - 2, imgSize + 4, imgSize + 4, 8, 8, "F")

        // Add the image - make sure to specify the format correctly
        const imageFormat = getImageFormat(imageBase64)
        pdf.addImage(imageBase64, imageFormat, imgX, sidebarY, imgSize, imgSize)
        sidebarY += imgSize + 10
      } catch (error) {
        console.error("Error adding image:", error)
        sidebarY += 10
      }
    } else {
      // Profile placeholder
      pdf.setFillColor(20, 184, 166) // Teal
      const placeholderSize = 35
      const placeholderX = (sidebarWidth - placeholderSize) / 2
      pdf.roundedRect(placeholderX, sidebarY, placeholderSize, placeholderSize, 8, 8, "F")

      // Add initials
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      const initials = resumeData.personalInfo.fullName?.charAt(0) || "U"
      pdf.text(initials, placeholderX + placeholderSize / 2, sidebarY + placeholderSize / 2 + 3, { align: "center" })
      sidebarY += placeholderSize + 10
    }

    // Name and title in sidebar
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(fontSizes.heading)
    pdf.setFont("helvetica", "bold")
    const name = resumeData.personalInfo.fullName || "BROCK WILDERN"
    const nameLines = pdf.splitTextToSize(name.toUpperCase(), sidebarWidth - 10)
    pdf.text(nameLines, sidebarWidth / 2, sidebarY, { align: "center" })
    sidebarY += nameLines.length * 6 + 5

    pdf.setTextColor(20, 184, 166)
    pdf.setFontSize(fontSizes.body)
    pdf.setFont("helvetica", "normal")
    pdf.text("WEB DEVELOPER", sidebarWidth / 2, sidebarY, { align: "center" })
    sidebarY += 15

    // Contact section
    const contactItems = [
      { icon: "📧", text: resumeData.personalInfo.email || "brock@email.com" },
      { icon: "📞", text: resumeData.personalInfo.phone || "+012 3456 789" },
      { icon: "📍", text: resumeData.personalInfo.location || "Santa Clara, California" },
    ]

    contactItems.forEach((item) => {
      if (item.text) {
        // Icon circle
        pdf.setFillColor(20, 184, 166)
        pdf.circle(15, sidebarY, 3, "F")

        // Contact text
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(fontSizes.small)
        const contactLines = pdf.splitTextToSize(item.text, sidebarWidth - 25)
        pdf.text(contactLines, 22, sidebarY + 1)
        sidebarY += Math.max(contactLines.length * 4, 8)
      }
    })

    sidebarY += 10

    // Education in sidebar
    pdf.setTextColor(20, 184, 166)
    pdf.setFontSize(fontSizes.subheading)
    pdf.setFont("helvetica", "bold")
    pdf.text("EDUCATION", 10, sidebarY)
    sidebarY += 8

    if (resumeData.education.length > 0) {
      resumeData.education.forEach((edu) => {
        pdf.setTextColor(20, 184, 166)
        pdf.setFontSize(fontSizes.body)
        pdf.setFont("helvetica", "bold")
        const degreeLines = pdf.splitTextToSize(edu.degree, sidebarWidth - 20)
        pdf.text(degreeLines, 10, sidebarY)
        sidebarY += degreeLines.length * 4 + 2

        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        const institutionLines = pdf.splitTextToSize(edu.institution, sidebarWidth - 20)
        pdf.text(institutionLines, 10, sidebarY)
        sidebarY += institutionLines.length * 3 + 2

        if (edu.graduationDate) {
          pdf.setTextColor(180, 180, 180)
          pdf.text(edu.graduationDate, 10, sidebarY)
          sidebarY += 5
        }
        sidebarY += 5
      })
    }

    // Skills in sidebar
    sidebarY += 10
    pdf.setTextColor(20, 184, 166)
    pdf.setFontSize(fontSizes.subheading)
    pdf.setFont("helvetica", "bold")
    pdf.text("SKILLS", 10, sidebarY)
    sidebarY += 8

    if (resumeData.skills.length > 0) {
      resumeData.skills.forEach((skill) => {
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        pdf.text(skill.name, 10, sidebarY)
        sidebarY += 5

        // Skill level circles
        const circleSize = 2
        const circleSpacing = 6
        for (let i = 0; i < 5; i++) {
          if (i < skill.level) {
            pdf.setFillColor(20, 184, 166)
            pdf.circle(10 + i * circleSpacing, sidebarY, circleSize, "F")
          } else {
            pdf.setDrawColor(20, 184, 166)
            pdf.setLineWidth(0.5)
            pdf.circle(10 + i * circleSpacing, sidebarY, circleSize, "S")
          }
        }
        sidebarY += 8
      })
    }

    // Main content area
    // Working Experience section
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(fontSizes.heading)
    pdf.setFont("helvetica", "bold")
    pdf.text("WORKING EXPERIENCE", mainContentStart, mainY)

    // Underline
    pdf.setDrawColor(20, 184, 166)
    pdf.setLineWidth(2)
    pdf.line(mainContentStart, mainY + 2, mainContentStart + 60, mainY + 2)
    mainY += 12

    // Professional summary
    if (resumeData.personalInfo.summary) {
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.body)
      pdf.setFont("helvetica", "normal")
      const summaryLines = pdf.splitTextToSize(resumeData.personalInfo.summary, mainContentWidth)
      pdf.text(summaryLines, mainContentStart, mainY)
      mainY += summaryLines.length * 4 + 10
    }

    // Experience section
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(fontSizes.heading)
    pdf.setFont("helvetica", "bold")
    pdf.text("EXPERIENCE", mainContentStart, mainY)

    pdf.setDrawColor(20, 184, 166)
    pdf.setLineWidth(2)
    pdf.line(mainContentStart, mainY + 2, mainContentStart + 40, mainY + 2)
    mainY += 12

    if (resumeData.experiences.length > 0) {
      resumeData.experiences.forEach((exp) => {
        // Check if we need a new page
        if (mainY > pageHeight - 60) {
          pdf.addPage()
          mainY = 20
          // Redraw sidebar on new page
          pdf.setFillColor(33, 37, 41)
          pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
        }

        // Position and company
        pdf.setTextColor(20, 184, 166)
        pdf.setFontSize(fontSizes.subheading)
        pdf.setFont("helvetica", "bold")
        pdf.text(exp.position, mainContentStart, mainY)

        // Date on the right
        if (exp.startDate || exp.endDate) {
          const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          pdf.text(dateText, pageWidth - 15, mainY, { align: "right" })
        }
        mainY += 6

        // Company
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.body)
        pdf.setFont("helvetica", "bold")
        pdf.text(exp.company, mainContentStart, mainY)
        mainY += 5

        // Location
        if (exp.location) {
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          pdf.text(exp.location, mainContentStart, mainY)
          mainY += 5
        }

        // Description with bullet points
        if (exp.description) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.body)
          pdf.setFont("helvetica", "normal")

          const descriptionLines = exp.description.split("\n").filter((line) => line.trim())
          descriptionLines.forEach((line) => {
            if (line.trim()) {
              // Add arrow bullet
              pdf.setTextColor(20, 184, 166)
              pdf.text("→", mainContentStart, mainY)

              // Add text
              pdf.setTextColor(0, 0, 0)
              const textLines = pdf.splitTextToSize(line.trim(), mainContentWidth - 10)
              pdf.text(textLines, mainContentStart + 8, mainY)
              mainY += textLines.length * 4 + 2
            }
          })
        }
        mainY += 8
      })
    }

    // Projects section
    if (resumeData.projects.length > 0) {
      if (mainY > pageHeight - 80) {
        pdf.addPage()
        mainY = 20
        // Redraw sidebar on new page
        pdf.setFillColor(33, 37, 41)
        pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
      }

      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.heading)
      pdf.setFont("helvetica", "bold")
      pdf.text("PROJECTS", mainContentStart, mainY)

      pdf.setDrawColor(20, 184, 166)
      pdf.setLineWidth(2)
      pdf.line(mainContentStart, mainY + 2, mainContentStart + 35, mainY + 2)
      mainY += 12

      resumeData.projects.forEach((project) => {
        pdf.setTextColor(20, 184, 166)
        pdf.setFontSize(fontSizes.subheading)
        pdf.setFont("helvetica", "bold")
        pdf.text(project.name, mainContentStart, mainY)
        mainY += 6

        if (project.description) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.body)
          pdf.setFont("helvetica", "normal")
          const descLines = pdf.splitTextToSize(project.description, mainContentWidth)
          pdf.text(descLines, mainContentStart, mainY)
          mainY += descLines.length * 4 + 3
        }

        if (project.technologies.length > 0) {
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          const techText = `Technologies: ${project.technologies.join(", ")}`
          const techLines = pdf.splitTextToSize(techText, mainContentWidth)
          pdf.text(techLines, mainContentStart, mainY)
          mainY += techLines.length * 3 + 5
        }

        // Add clickable project links
        if (project.link) {
          const projectUrl = project.link.startsWith("http") ? project.link : `https://${project.link}`
          pdf.link(pageWidth - 30, mainY - 15, 25, 5, { url: projectUrl })
        }
        if (project.github) {
          const githubUrl = project.github.startsWith("http") ? project.github : `https://${project.github}`
          pdf.link(pageWidth - 55, mainY - 15, 25, 5, { url: githubUrl })
        }

        mainY += 5
      })
    }

    // Save the PDF
    const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_tech.pdf`
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating Tech PDF:", error)
    throw new Error("Failed to generate PDF")
  }
}

// Modern Template PDF - Blue gradient header with photo
async function generateModernPDF(resumeData: ResumeState) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  const fontSizes = getFontSizes(resumeData.customization.fontSize)
  const primaryColor = hexToRgb(resumeData.customization.primaryColor)
  const secondaryColor = hexToRgb(resumeData.customization.secondaryColor)

  let yPosition = 0

  try {
    // Header background gradient (simulate with rectangles)
    const headerHeight = 50
    for (let i = 0; i < headerHeight; i++) {
      const ratio = i / headerHeight
      const r = Math.round(primaryColor.r + (secondaryColor.r - primaryColor.r) * ratio)
      const g = Math.round(primaryColor.g + (secondaryColor.g - primaryColor.g) * ratio)
      const b = Math.round(primaryColor.b + (secondaryColor.b - primaryColor.b) * ratio)
      pdf.setFillColor(r, g, b)
      pdf.rect(0, i, pageWidth, 1, "F")
    }

    yPosition = 20

    // Profile photo in header
    if (resumeData.personalInfo.profileImage) {
      try {
        const imageBase64 = await getImageAsBase64(resumeData.personalInfo.profileImage)
        const imgSize = 25
        const imgX = margin

        // Add the image - make sure to specify the format correctly
        const imageFormat = getImageFormat(imageBase64)
        pdf.addImage(imageBase64, imageFormat, imgX, yPosition, imgSize, imgSize)

        // Name and contact next to photo
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(fontSizes.title)
        pdf.setFont("helvetica", "bold")
        pdf.text(resumeData.personalInfo.fullName || "Your Name", imgX + imgSize + 10, yPosition + 8)

        // Contact info
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        const contactInfo = []
        if (resumeData.personalInfo.email) contactInfo.push(resumeData.personalInfo.email)
        if (resumeData.personalInfo.phone) contactInfo.push(resumeData.personalInfo.phone)
        if (resumeData.personalInfo.location) contactInfo.push(resumeData.personalInfo.location)

        if (contactInfo.length > 0) {
          pdf.text(contactInfo.join(" | "), imgX + imgSize + 10, yPosition + 15)
        }

        // Add clickable links to PDF
        if (resumeData.personalInfo.email) {
          pdf.link(imgX + imgSize + 10, yPosition + 12, 100, 5, { url: `mailto:${resumeData.personalInfo.email}` })
        }
        if (resumeData.personalInfo.website) {
          const websiteUrl = resumeData.personalInfo.website.startsWith("http")
            ? resumeData.personalInfo.website
            : `https://${resumeData.personalInfo.website}`
          pdf.link(imgX + imgSize + 10, yPosition + 17, 100, 5, { url: websiteUrl })
        }
      } catch (error) {
        console.error("Error adding image:", error)

        // Fallback to centered name without photo
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(fontSizes.title)
        pdf.setFont("helvetica", "bold")
        pdf.text(resumeData.personalInfo.fullName || "Your Name", pageWidth / 2, yPosition + 8, { align: "center" })

        // Contact info centered
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        const contactInfo = []
        if (resumeData.personalInfo.email) contactInfo.push(resumeData.personalInfo.email)
        if (resumeData.personalInfo.phone) contactInfo.push(resumeData.personalInfo.phone)
        if (resumeData.personalInfo.location) contactInfo.push(resumeData.personalInfo.location)

        if (contactInfo.length > 0) {
          pdf.text(contactInfo.join(" | "), pageWidth / 2, yPosition + 15, { align: "center" })
        }
      }
    } else {
      // Center name without photo
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(fontSizes.title)
      pdf.setFont("helvetica", "bold")
      pdf.text(resumeData.personalInfo.fullName || "Your Name", pageWidth / 2, yPosition + 8, { align: "center" })

      // Contact info centered
      pdf.setFontSize(fontSizes.small)
      pdf.setFont("helvetica", "normal")
      const contactInfo = []
      if (resumeData.personalInfo.email) contactInfo.push(resumeData.personalInfo.email)
      if (resumeData.personalInfo.phone) contactInfo.push(resumeData.personalInfo.phone)
      if (resumeData.personalInfo.location) contactInfo.push(resumeData.personalInfo.location)

      if (contactInfo.length > 0) {
        pdf.text(contactInfo.join(" | "), pageWidth / 2, yPosition + 15, { align: "center" })
      }
    }

    yPosition = headerHeight + 10

    // Helper function to add section header
    const addSectionHeader = (title: string) => {
      pdf.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b)
      pdf.rect(margin, yPosition, contentWidth, 8, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(fontSizes.heading)
      pdf.setFont("helvetica", "bold")
      pdf.text(title.toUpperCase(), margin + 2, yPosition + 5.5)
      yPosition += 12
    }

    // Professional Summary
    if (resumeData.personalInfo.summary) {
      addSectionHeader("Professional Summary")
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.body)
      pdf.setFont("helvetica", "normal")
      const summaryLines = pdf.splitTextToSize(resumeData.personalInfo.summary, contentWidth)
      pdf.text(summaryLines, margin, yPosition)
      yPosition += summaryLines.length * 4 + 8
    }

    // Work Experience
    if (resumeData.experiences.length > 0) {
      addSectionHeader("Work Experience")

      resumeData.experiences.forEach((exp) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 60) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
        pdf.setFontSize(fontSizes.subheading)
        pdf.setFont("helvetica", "bold")
        pdf.text(exp.position, margin, yPosition)

        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.body)
        pdf.text(exp.company, pageWidth - margin, yPosition, { align: "right" })
        yPosition += 6

        if (exp.location || exp.startDate || exp.endDate) {
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          pdf.setFont("helvetica", "italic")

          const locationText = exp.location || ""
          pdf.text(locationText, margin, yPosition)

          const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
          pdf.text(dateText, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 5
        }

        if (exp.description) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.body)
          pdf.setFont("helvetica", "normal")
          const descLines = pdf.splitTextToSize(exp.description, contentWidth)
          pdf.text(descLines, margin, yPosition)
          yPosition += descLines.length * 4 + 8
        } else {
          yPosition += 8
        }
      })
    }

    // Education
    if (resumeData.education.length > 0) {
      if (yPosition > pageHeight - 60) {
        pdf.addPage()
        yPosition = margin
      }

      addSectionHeader("Education")

      resumeData.education.forEach((edu) => {
        pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
        pdf.setFontSize(fontSizes.subheading)
        pdf.setFont("helvetica", "bold")
        pdf.text(`${edu.degree} in ${edu.field}`, margin, yPosition)

        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.body)
        pdf.text(edu.institution, pageWidth - margin, yPosition, { align: "right" })
        yPosition += 6

        if (edu.location || edu.graduationDate) {
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          pdf.setFont("helvetica", "italic")

          const locationText = edu.location || ""
          pdf.text(locationText, margin, yPosition)

          const dateText = edu.graduationDate || ""
          pdf.text(dateText, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 5
        }

        if (edu.gpa) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.small)
          pdf.text(`GPA: ${edu.gpa}`, margin, yPosition)
          yPosition += 5
        }

        yPosition += 5
      })
    }

    // Skills
    if (resumeData.skills.length > 0) {
      if (yPosition > pageHeight - 40) {
        pdf.addPage()
        yPosition = margin
      }

      addSectionHeader("Skills")

      // Group skills by level
      const skillsByLevel = resumeData.skills.reduce(
        (acc, skill) => {
          const level = skill.level
          if (!acc[level]) acc[level] = []
          acc[level].push(skill.name)
          return acc
        },
        {} as Record<number, string[]>,
      )

      const levelNames = { 5: "Expert", 4: "Advanced", 3: "Intermediate", 2: "Basic", 1: "Beginner" }

      Object.entries(skillsByLevel)
        .sort(([a], [b]) => Number(b) - Number(a))
        .forEach(([level, skills]) => {
          pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b)
          pdf.setFontSize(fontSizes.body)
          pdf.setFont("helvetica", "bold")
          pdf.text(`${levelNames[Number(level) as keyof typeof levelNames]}:`, margin, yPosition)

          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.small)
          pdf.setFont("helvetica", "normal")
          const skillText = skills.join(", ")
          const skillLines = pdf.splitTextToSize(skillText, contentWidth - 25)
          pdf.text(skillLines, margin + 25, yPosition)
          yPosition += skillLines.length * 3.5 + 5
        })
    }

    // Projects
    if (resumeData.projects.length > 0) {
      if (yPosition > pageHeight - 40) {
        pdf.addPage()
        yPosition = margin
      }

      addSectionHeader("Projects")

      resumeData.projects.forEach((project) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
        pdf.setFontSize(fontSizes.subheading)
        pdf.setFont("helvetica", "bold")
        pdf.text(project.name, margin, yPosition)
        yPosition += 6

        if (project.description) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.body)
          pdf.setFont("helvetica", "normal")
          const descLines = pdf.splitTextToSize(project.description, contentWidth)
          pdf.text(descLines, margin, yPosition)
          yPosition += descLines.length * 4 + 3
        }

        if (project.technologies.length > 0) {
          pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b)
          pdf.setFontSize(fontSizes.small)
          pdf.setFont("helvetica", "italic")
          const techText = `Technologies: ${project.technologies.join(", ")}`
          const techLines = pdf.splitTextToSize(techText, contentWidth)
          pdf.text(techLines, margin, yPosition)
          yPosition += techLines.length * 3.5 + 3
        }

        const links = []
        if (project.link) links.push(`Demo: ${project.link}`)
        if (project.github) links.push(`GitHub: ${project.github}`)

        if (links.length > 0) {
          pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
          pdf.setFontSize(fontSizes.small - 1)
          pdf.setFont("helvetica", "normal")
          const linkText = links.join(" | ")
          const linkLines = pdf.splitTextToSize(linkText, contentWidth)
          pdf.text(linkLines, margin, yPosition)
          yPosition += linkLines.length * 3 + 8
        } else {
          yPosition += 8
        }

        // Add clickable project links
        const mainY = yPosition // Declare mainY here
        if (project.link) {
          const projectUrl = project.link.startsWith("http") ? project.link : `https://${project.link}`
          pdf.link(pageWidth - 30, mainY - 15, 25, 5, { url: projectUrl })
        }
        if (project.github) {
          const githubUrl = project.github.startsWith("http") ? project.github : `https://${project.github}`
          pdf.link(pageWidth - 55, mainY - 15, 25, 5, { url: githubUrl })
        }
      })
    }

    // Save the PDF
    const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_modern.pdf`
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating Modern PDF:", error)
    throw new Error("Failed to generate PDF")
  }
}

// Elegant Template PDF - Minimalist A/X design
async function generateElegantPDF(resumeData: ResumeState) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const sidebarWidth = 60
  const mainContentStart = sidebarWidth + 10
  const mainContentWidth = pageWidth - mainContentStart - margin
  const fontSizes = getFontSizes(resumeData.customization.fontSize)

  let sidebarY = 30
  let mainY = 30

  try {
    // Header with profile circle
    const circleSize = 15
    const circleX = pageWidth / 2
    const circleY = 25

    pdf.setFillColor(50, 50, 50)
    pdf.circle(circleX, circleY, circleSize, "F")

    // A/X text in circle
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("A/X", circleX, circleY + 2, { align: "center" })

    // Name
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(fontSizes.title)
    pdf.setFont("helvetica", "bold")
    const name = resumeData.personalInfo.fullName || "ALON XEFER"
    pdf.text(name.toUpperCase(), pageWidth / 2, circleY + circleSize + 8, { align: "center" })

    // Job title
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(fontSizes.body)
    pdf.setFont("helvetica", "normal")
    pdf.text("WEB DEVELOPER", pageWidth / 2, circleY + circleSize + 15, { align: "center" })

    // Horizontal line
    pdf.setDrawColor(200, 200, 200)
    pdf.setLineWidth(0.5)
    pdf.line(margin, circleY + circleSize + 25, pageWidth - margin, circleY + circleSize + 25)

    sidebarY = circleY + circleSize + 35
    mainY = sidebarY

    // Sidebar content
    // Contact section
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(fontSizes.subheading)
    pdf.setFont("helvetica", "bold")
    pdf.text("CONTACT", margin, sidebarY)
    sidebarY += 8

    const contactItems = [
      resumeData.personalInfo.location || "123 6th St. Melbourne, 32904",
      resumeData.personalInfo.phone || "t 571 989 4662",
      resumeData.personalInfo.email || "alon@youremail.com",
      resumeData.personalInfo.website || "www.youremail.com",
    ]

    contactItems.forEach((item) => {
      if (item) {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        const contactLines = pdf.splitTextToSize(item, sidebarWidth - 5)
        pdf.text(contactLines, margin, sidebarY)
        sidebarY += contactLines.length * 4 + 2
      }
    })

    sidebarY += 10

    // Social section
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(fontSizes.subheading)
    pdf.setFont("helvetica", "bold")
    pdf.text("SOCIAL", margin, sidebarY)
    sidebarY += 8

    const socialItems = [
      "facebook.com/alonsxefer",
      "twitter.com/alonsxefer",
      "linkedin.com/alonsxefer",
      "instagram.com/alonsxefer",
    ]

    socialItems.forEach((item) => {
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.small)
      pdf.setFont("helvetica", "normal")
      pdf.text(item, margin, sidebarY)
      sidebarY += 4
    })

    sidebarY += 10

    // Skills in sidebar
    if (resumeData.skills.length > 0) {
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.subheading)
      pdf.setFont("helvetica", "bold")
      pdf.text("SKILLS", margin, sidebarY)
      sidebarY += 8

      resumeData.skills.forEach((skill) => {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        pdf.text(skill.name, margin, sidebarY)
        sidebarY += 5

        // Skill level bars
        const barWidth = 3
        const barSpacing = 4
        for (let i = 0; i < 5; i++) {
          if (i < skill.level) {
            pdf.setFillColor(0, 0, 0)
            pdf.rect(margin + i * barSpacing, sidebarY - 2, barWidth, 1, "F")
          } else {
            pdf.setDrawColor(200, 200, 200)
            pdf.setLineWidth(0.5)
            pdf.rect(margin + i * barSpacing, sidebarY - 2, barWidth, 1, "S")
          }
        }
        sidebarY += 8
      })
    }

    // Main content area
    // About section
    if (resumeData.personalInfo.summary) {
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.subheading)
      pdf.setFont("helvetica", "bold")
      pdf.text("ABOUT", mainContentStart, mainY)
      mainY += 8

      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.body)
      pdf.setFont("helvetica", "normal")
      const summaryLines = pdf.splitTextToSize(resumeData.personalInfo.summary, mainContentWidth)
      pdf.text(summaryLines, mainContentStart, mainY)
      mainY += summaryLines.length * 4 + 12
    }

    // Education
    if (resumeData.education.length > 0) {
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.subheading)
      pdf.setFont("helvetica", "bold")
      pdf.text("EDUCATION", mainContentStart, mainY)
      mainY += 8

      resumeData.education.forEach((edu) => {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.body)
        pdf.setFont("helvetica", "bold")
        pdf.text(`${edu.degree} in ${edu.field}`, mainContentStart, mainY)

        if (edu.graduationDate) {
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          pdf.text(edu.graduationDate, pageWidth - margin, mainY, { align: "right" })
        }
        mainY += 5

        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        pdf.text(edu.institution, mainContentStart, mainY)
        mainY += 8
      })
      mainY += 5
    }

    // Experience
    if (resumeData.experiences.length > 0) {
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.subheading)
      pdf.setFont("helvetica", "bold")
      pdf.text("EXPERIENCE", mainContentStart, mainY)
      mainY += 8

      resumeData.experiences.forEach((exp) => {
        // Check if we need a new page
        if (mainY > pageHeight - 60) {
          pdf.addPage()
          mainY = margin
        }

        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.body)
        pdf.setFont("helvetica", "bold")
        pdf.text(exp.position, mainContentStart, mainY)

        if (exp.startDate || exp.endDate) {
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
          pdf.text(dateText, pageWidth - margin, mainY, { align: "right" })
        }
        mainY += 5

        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(fontSizes.small)
        pdf.setFont("helvetica", "normal")
        pdf.text(exp.company, mainContentStart, mainY)
        mainY += 5

        if (exp.description) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.body)
          pdf.setFont("helvetica", "normal")
          const descLines = pdf.splitTextToSize(exp.description, mainContentWidth)
          pdf.text(descLines, mainContentStart, mainY)
          mainY += descLines.length * 4 + 8
        } else {
          mainY += 8
        }
      })
    }

    // Projects
    if (resumeData.projects.length > 0) {
      if (mainY > pageHeight - 60) {
        pdf.addPage()
        mainY = margin
      }

      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSizes.subheading)
      pdf.setFont("helvetica", "bold")
      pdf.text("PROJECTS", mainContentStart, mainY)
      mainY += 8

      resumeData.projects.forEach((project) => {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(fontSizes.body)
        pdf.setFont("helvetica", "bold")
        pdf.text(project.name, mainContentStart, mainY)
        mainY += 6

        if (project.description) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(fontSizes.body)
          pdf.setFont("helvetica", "normal")
          const descLines = pdf.splitTextToSize(project.description, mainContentWidth)
          pdf.text(descLines, mainContentStart, mainY)
          mainY += descLines.length * 4 + 3
        }

        if (project.technologies.length > 0) {
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(fontSizes.small)
          const techText = `Technologies: ${project.technologies.join(", ")}`
          const techLines = pdf.splitTextToSize(techText, mainContentWidth)
          pdf.text(techLines, mainContentStart, mainY)

          // Add clickable project links
          if (project.link) {
            const projectUrl = project.link.startsWith("http") ? project.link : `https://${project.link}`
            pdf.link(pageWidth - 30, mainY - 15, 25, 5, { url: projectUrl })
          }
          if (project.github) {
            const githubUrl = project.github.startsWith("http") ? project.github : `https://${project.github}`
            pdf.link(pageWidth - 55, mainY - 15, 25, 5, { url: githubUrl })
          }

          mainY += techLines.length * 3 + 5
        }
        mainY += 5
      })
    }

    // Save the PDF
    const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_elegant.pdf`
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating Elegant PDF:", error)
    throw new Error("Failed to generate PDF")
  }
}

// Default implementations for other templates
async function generateClassicPDF(resumeData: ResumeState) {
  const templateId = "classic"
  const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_${templateId}.pdf`
  await generateElegantPDF(resumeData)
}

async function generateBoldPDF(resumeData: ResumeState) {
  const templateId = "bold"
  const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_${templateId}.pdf`
  return generateTechPDF(resumeData)
}

async function generateProfessionalPDF(resumeData: ResumeState) {
  const templateId = "professional"
  const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_${templateId}.pdf`
  return generateModernPDF(resumeData)
}

async function generateMinimalPDF(resumeData: ResumeState) {
  const templateId = "minimal"
  const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_${templateId}.pdf`
  return generateElegantPDF(resumeData)
}

async function generateCreativePDF(resumeData: ResumeState) {
  const templateId = "creative"
  const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_${templateId}.pdf`
  return generateTechPDF(resumeData)
}

async function generateCleanPDF(resumeData: ResumeState) {
  const templateId = "clean"
  const fileName = `${resumeData.personalInfo.fullName || "Resume"}_PrimeCV_${templateId}.pdf`
  return generateModernPDF(resumeData)
}
