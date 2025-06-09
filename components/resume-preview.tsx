"use client"

import { motion } from "framer-motion"
import { useResume } from "@/lib/resume-context"
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Download, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { generatePDF } from "@/lib/pdf-generator"

export function ResumePreview() {
  const { state } = useResume()
  const { personalInfo, experiences, education, skills, projects, selectedTemplate, customization } = state

  const handleDownload = async () => {
    try {
      await generatePDF(state)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  // Get font size classes
  const getFontSizeClasses = () => {
    switch (customization.fontSize) {
      case "small":
        return {
          title: "text-2xl",
          heading: "text-lg",
          subheading: "text-base",
          body: "text-sm",
          small: "text-xs",
        }
      case "large":
        return {
          title: "text-4xl",
          heading: "text-xl",
          subheading: "text-lg",
          body: "text-base",
          small: "text-sm",
        }
      default: // medium
        return {
          title: "text-3xl",
          heading: "text-lg",
          subheading: "text-base",
          body: "text-sm",
          small: "text-xs",
        }
    }
  }

  const fontSizes = getFontSizeClasses()

  // Render different templates based on selection
  const renderTemplate = () => {
    const templateProps = { state, fontSizes, customization }

    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate {...templateProps} />
      case "tech":
        return <TechTemplate {...templateProps} />
      case "elegant":
        return <ElegantTemplate {...templateProps} />
      case "classic":
        return <ClassicTemplate {...templateProps} />
      case "bold":
        return <BoldTemplate {...templateProps} />
      case "professional":
        return <ProfessionalTemplate {...templateProps} />
      case "minimal":
        return <MinimalTemplate {...templateProps} />
      case "creative":
        return <CreativeTemplate {...templateProps} />
      case "clean":
        return <CleanTemplate {...templateProps} />
      default:
        return <ModernTemplate {...templateProps} />
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Resume Preview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">Review your resume before downloading</p>

          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-8 py-2 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="shadow-2xl bg-white print:shadow-none print:bg-white rounded-lg overflow-hidden"
          style={{
            fontFamily: customization.fontFamily,
            color: customization.textColor,
          }}
        >
          {renderTemplate()}
        </motion.div>
      </div>
    </div>
  )
}

// Modern Template with Photo Support
function ModernTemplate({ state, fontSizes, customization }: any) {
  const { personalInfo, experiences, education, skills, projects } = state

  return (
    <div className="bg-white">
      {/* Header */}
      <div
        className="text-white p-8"
        style={{
          background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`,
        }}
      >
        <div className="flex items-center gap-6">
          {personalInfo.profileImage && (
            <img
              src={personalInfo.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
          )}
          <div className="flex-1">
            <h1 className={`${fontSizes.title} font-bold mb-2`}>{personalInfo.fullName || "Your Name"}</h1>
            <div className={`flex flex-wrap gap-4 ${fontSizes.small}`}>
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="hover:underline cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${personalInfo.phone}`} className="hover:underline cursor-pointer">
                    {personalInfo.phone}
                  </a>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a
                    href={
                      personalInfo.website.startsWith("http") ? personalInfo.website : `https://${personalInfo.website}`
                    }
                    className="hover:underline cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalInfo.website}
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  <a
                    href={
                      personalInfo.linkedin.startsWith("http")
                        ? personalInfo.linkedin
                        : `https://${personalInfo.linkedin}`
                    }
                    className="hover:underline cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <div className="text-white py-2 px-4 mb-4 rounded" style={{ backgroundColor: customization.primaryColor }}>
              <h2 className={`${fontSizes.heading} font-bold`}>PROFESSIONAL SUMMARY</h2>
            </div>
            <p className={`${fontSizes.body} leading-relaxed`} style={{ color: customization.textColor }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <div className="text-white py-2 px-4 mb-4 rounded" style={{ backgroundColor: customization.primaryColor }}>
              <h2 className={`${fontSizes.heading} font-bold`}>WORK EXPERIENCE</h2>
            </div>
            <div className="space-y-6">
              {experiences.map((exp: any) => (
                <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: customization.primaryColor }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`${fontSizes.subheading} font-bold`} style={{ color: customization.primaryColor }}>
                      {exp.position}
                    </h3>
                    <div
                      className={`${fontSizes.small} flex items-center gap-1`}
                      style={{ color: customization.secondaryColor }}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                  </div>
                  <p className={`${fontSizes.body} font-medium mb-1`} style={{ color: customization.textColor }}>
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p
                      className={`${fontSizes.small} mb-2 flex items-center gap-1`}
                      style={{ color: customization.secondaryColor }}
                    >
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p className={`${fontSizes.body} whitespace-pre-line`} style={{ color: customization.textColor }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <div className="text-white py-2 px-4 mb-4 rounded" style={{ backgroundColor: customization.primaryColor }}>
              <h2 className={`${fontSizes.heading} font-bold`}>EDUCATION</h2>
            </div>
            <div className="space-y-4">
              {education.map((edu: any) => (
                <div key={edu.id} className="border-l-4 pl-4" style={{ borderColor: "#10B981" }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`${fontSizes.subheading} font-bold`} style={{ color: "#10B981" }}>
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className={`${fontSizes.body} mb-1`} style={{ color: customization.textColor }}>
                        {edu.institution}
                      </p>
                      {edu.location && (
                        <p
                          className={`${fontSizes.small} flex items-center gap-1`}
                          style={{ color: customization.secondaryColor }}
                        >
                          <MapPin className="w-3 h-3" />
                          {edu.location}
                        </p>
                      )}
                      {edu.gpa && (
                        <p className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    {edu.graduationDate && (
                      <div
                        className={`${fontSizes.small} flex items-center gap-1`}
                        style={{ color: customization.secondaryColor }}
                      >
                        <Calendar className="w-3 h-3" />
                        <span>{edu.graduationDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <div className="text-white py-2 px-4 mb-4 rounded" style={{ backgroundColor: customization.primaryColor }}>
              <h2 className={`${fontSizes.heading} font-bold`}>SKILLS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill: any) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className={`${fontSizes.body} font-medium`} style={{ color: customization.textColor }}>
                    {skill.name}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: level <= skill.level ? customization.primaryColor : "#E5E7EB",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <div className="text-white py-2 px-4 mb-4 rounded" style={{ backgroundColor: customization.primaryColor }}>
              <h2 className={`${fontSizes.heading} font-bold`}>PROJECTS</h2>
            </div>
            <div className="space-y-6">
              {projects.map((project: any) => (
                <div key={project.id} className="border-l-4 pl-4" style={{ borderColor: "#8B5CF6" }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`${fontSizes.subheading} font-bold`} style={{ color: "#8B5CF6" }}>
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      {project.link && (
                        <a
                          href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" style={{ color: customization.secondaryColor }} />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github.startsWith("http") ? project.github : `https://${project.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          <Github className="w-4 h-4" style={{ color: customization.secondaryColor }} />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className={`${fontSizes.body} leading-relaxed mb-3`} style={{ color: customization.textColor }}>
                      {project.description}
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary" className={fontSizes.small}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Tech Template with accurate design matching the provided image
function TechTemplate({ state, fontSizes, customization }: any) {
  const { personalInfo, experiences, education, skills, projects } = state

  return (
    <div className="bg-white flex">
      {/* Left Sidebar - Dark */}
      <div className="w-1/3 bg-gray-900 text-white p-6">
        {/* Profile Section */}
        <div className="text-center mb-8">
          {personalInfo.profileImage ? (
            <img
              src={personalInfo.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 rounded-2xl object-cover mx-auto mb-4 border-4 border-teal-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-teal-500 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold">{personalInfo.fullName?.charAt(0) || "U"}</span>
            </div>
          )}
          <h1 className={`${fontSizes.title} font-bold mb-2`}>{personalInfo.fullName || "BROCK WILDERN"}</h1>
          <p className="text-teal-400 text-lg font-medium tracking-wider">WEB DEVELOPER</p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-xs">📧</span>
            </div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:underline cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              className={fontSizes.small}
            >
              {personalInfo.email || "brock@email.com"}
            </a>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-xs">📞</span>
            </div>
            <a
              href={`tel:${personalInfo.phone}`}
              className="hover:underline cursor-pointer"
              className={fontSizes.small}
            >
              {personalInfo.phone || "+012 3456 789"}
            </a>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-xs">📍</span>
            </div>
            <span className={fontSizes.small}>{personalInfo.location || "Santa Clara, California"}</span>
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className={`${fontSizes.heading} font-bold text-teal-400 mb-4`}>EDUCATION</h2>
          {education.length > 0 ? (
            education.map((edu: any) => (
              <div key={edu.id} className="mb-4">
                <h3 className={`${fontSizes.body} font-bold text-teal-400`}>{edu.degree}</h3>
                <p className={fontSizes.small}>{edu.institution}</p>
                <p className={`${fontSizes.small} text-gray-400`}>{edu.graduationDate}</p>
              </div>
            ))
          ) : (
            <div>
              <h3 className={`${fontSizes.body} font-bold text-teal-400`}>Bachelor in Web Development</h3>
              <p className={fontSizes.small}>University of Santa Clara</p>
              <p className={`${fontSizes.small} text-gray-400`}>2014 - 2018</p>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className={`${fontSizes.heading} font-bold text-teal-400 mb-4`}>SKILLS</h2>
          {skills.length > 0 ? (
            skills.map((skill: any) => (
              <div key={skill.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className={fontSizes.small}>{skill.name}</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-4 h-4 rounded-full ${
                        level <= skill.level ? "bg-teal-500" : "border border-teal-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="mb-4">
                <span className={fontSizes.small}>CMS</span>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-4 h-4 rounded-full ${level <= 3 ? "bg-teal-500" : "border border-teal-500"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <span className={fontSizes.small}>HTML</span>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-4 h-4 rounded-full ${level <= 5 ? "bg-teal-500" : "border border-teal-500"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <span className={fontSizes.small}>Python</span>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-4 h-4 rounded-full ${level <= 4 ? "bg-teal-500" : "border border-teal-500"}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        {/* Professional Summary */}
        <div className="mb-8">
          <h2 className={`${fontSizes.heading} font-bold mb-4 border-b-2 border-teal-500 pb-2`}>WORKING EXPERIENCE</h2>
          <p className={`${fontSizes.body} leading-relaxed`} style={{ color: customization.textColor }}>
            {personalInfo.summary ||
              "Innovative, task-driven professional with 5 years of experience in web design and development across diverse industries. Equipped with a record of success in consistently identifying and providing the technological needs of companies through ingenious innovation."}
          </p>
        </div>

        {/* Work Experience */}
        <div className="mb-8">
          <h2 className={`${fontSizes.heading} font-bold mb-4 border-b-2 border-teal-500 pb-2`}>EXPERIENCE</h2>
          {experiences.length > 0 ? (
            experiences.map((exp: any) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`${fontSizes.subheading} font-bold text-teal-600`}>{exp.position}</h3>
                    <p className={`${fontSizes.body} font-medium`}>{exp.company}</p>
                    <p className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                      {exp.location}
                    </p>
                  </div>
                  <span className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className={`${fontSizes.body} whitespace-pre-line`} style={{ color: customization.textColor }}>
                    {exp.description.split("\n").map((line: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 mb-1">
                        <span className="text-teal-500 mt-1">→</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`${fontSizes.subheading} font-bold text-teal-600`}>Web Developer</h3>
                    <p className={`${fontSizes.body} font-medium`}>Ultimate Tech</p>
                    <p className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                      Santa Clara, California
                    </p>
                  </div>
                  <span className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                    05/2022 - Present
                  </span>
                </div>
                <div className={`${fontSizes.body}`} style={{ color: customization.textColor }}>
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-teal-500 mt-1">→</span>
                    <span>
                      Establish an interactive and dynamic website that guarantees high traffic, page views, and maximum
                      user experience, generating a 45% increase in the company's sales revenue.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-teal-500 mt-1">→</span>
                    <span>
                      Provide adequate training to 60+ staff members and 20+ junior web developers in internal web
                      functions, including steps on how to make minor updates/changes independently.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-teal-500 mt-1">→</span>
                    <span>
                      Administer the full lifecycle of software development for 12 critical projects of the company with
                      100% on-time delivery while staying 7% under budget.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className={`${fontSizes.heading} font-bold mb-4 border-b-2 border-teal-500 pb-2`}>PROJECTS</h2>
            <div className="space-y-4">
              {projects.map((project: any) => (
                <div key={project.id}>
                  <h3 className={`${fontSizes.subheading} font-bold text-teal-600`}>{project.name}</h3>
                  {project.description && (
                    <p className={`${fontSizes.body} mb-2`} style={{ color: customization.textColor }}>
                      {project.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" style={{ color: customization.secondaryColor }} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github.startsWith("http") ? project.github : `https://${project.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        <Github className="w-4 h-4" style={{ color: customization.secondaryColor }} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Elegant Template matching the A/X design
function ElegantTemplate({ state, fontSizes, customization }: any) {
  const { personalInfo, experiences, education, skills, projects } = state

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="text-center py-8 border-b border-gray-200">
        <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">A/X</span>
        </div>
        <h1 className={`${fontSizes.title} font-bold mb-2`} style={{ color: customization.textColor }}>
          {personalInfo.fullName || "ALON XEFER"}
        </h1>
        <p className={`${fontSizes.body} tracking-wider`} style={{ color: customization.secondaryColor }}>
          WEB DEVELOPER
        </p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 p-6 border-r border-gray-200">
          {/* Contact */}
          <div className="mb-8">
            <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: customization.textColor }}>
              CONTACT
            </h2>
            <div className={`space-y-2 ${fontSizes.small}`} style={{ color: customization.textColor }}>
              <p>{personalInfo.location || "123 6th St. Melbourne, 32904"}</p>
              <p>{personalInfo.phone || "t 571 989 4662"}</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {personalInfo.email || "alon@youremail.com"}
              </a>
              <a
                href={
                  personalInfo.website.startsWith("http") ? personalInfo.website : `https://${personalInfo.website}`
                }
                className="hover:underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {personalInfo.website || "www.youremail.com"}
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="mb-8">
            <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: customization.textColor }}>
              SOCIAL
            </h2>
            <div className={`space-y-2 ${fontSizes.small}`} style={{ color: customization.textColor }}>
              <p>facebook.com/alonsxefer</p>
              <p>twitter.com/alonsxefer</p>
              <p>linkedin.com/alonsxefer</p>
              <p>instagram.com/alonsxefer</p>
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: customization.textColor }}>
                SKILLS
              </h2>
              <div className="space-y-3">
                {skills.map((skill: any) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={fontSizes.small} style={{ color: customization.textColor }}>
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className="w-6 h-1"
                          style={{
                            backgroundColor: level <= skill.level ? customization.textColor : "#E5E7EB",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* About */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: customization.textColor }}>
                ABOUT
              </h2>
              <p className={`${fontSizes.body} leading-relaxed`} style={{ color: customization.textColor }}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: customization.textColor }}>
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu: any) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`${fontSizes.subheading} font-bold`} style={{ color: customization.textColor }}>
                          {edu.degree}
                        </h3>
                        <p className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                          {edu.institution}
                        </p>
                      </div>
                      <span className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                        {edu.graduationDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: customization.textColor }}>
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experiences.map((exp: any) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`${fontSizes.subheading} font-bold`} style={{ color: customization.textColor }}>
                          {exp.position}
                        </h3>
                        <p className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className={fontSizes.small} style={{ color: customization.secondaryColor }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className={`${fontSizes.body} whitespace-pre-line`} style={{ color: customization.textColor }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: customization.textColor }}>
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project: any) => (
                  <div key={project.id}>
                    <h3 className={`${fontSizes.subheading} font-bold`} style={{ color: customization.textColor }}>
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className={`${fontSizes.body} mb-2`} style={{ color: customization.textColor }}>
                        {project.description}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {project.link && (
                        <a
                          href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" style={{ color: customization.secondaryColor }} />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github.startsWith("http") ? project.github : `https://${project.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          <Github className="w-4 h-4" style={{ color: customization.secondaryColor }} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Default templates for other categories
function ClassicTemplate({ state, fontSizes, customization }: any) {
  return <ModernTemplate state={state} fontSizes={fontSizes} customization={customization} />
}

function BoldTemplate({ state, fontSizes, customization }: any) {
  return <TechTemplate state={state} fontSizes={fontSizes} customization={customization} />
}

function ProfessionalTemplate({ state, fontSizes, customization }: any) {
  return <ElegantTemplate state={state} fontSizes={fontSizes} customization={customization} />
}

function MinimalTemplate({ state, fontSizes, customization }: any) {
  return <ElegantTemplate state={state} fontSizes={fontSizes} customization={customization} />
}

function CreativeTemplate({ state, fontSizes, customization }: any) {
  return <TechTemplate state={state} fontSizes={fontSizes} customization={customization} />
}

function CleanTemplate({ state, fontSizes, customization }: any) {
  return <ModernTemplate state={state} fontSizes={fontSizes} customization={customization} />
}
