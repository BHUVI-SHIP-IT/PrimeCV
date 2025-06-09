"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useResume } from "@/lib/resume-context"
import { TopNavigation } from "@/components/top-navigation"
import { Footer } from "@/components/footer"
import { LandingPage } from "@/components/landing-page"
import { TemplateSelector } from "@/components/template-selector"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { SkillsForm } from "@/components/skills-form"
import { ProjectsForm } from "@/components/projects-form"
import { ResumePreview } from "@/components/resume-preview"
import { CustomizationPanel } from "@/components/customization-panel"
import { AnimatedBackground } from "@/components/animated-background"
import { CustomCursor } from "@/components/custom-cursor"
import { FeedbackBanner } from "@/components/feedback-banner"
import { StartupAnimation } from "@/components/startup-animation"

export default function Home() {
  const { state } = useResume()
  const { currentStep } = state

  const renderStep = () => {
    switch (currentStep) {
      case -1: // Landing page
        return <LandingPage />
      case 0:
        return <TemplateSelector />
      case 1:
        return <PersonalInfoForm />
      case 2:
        return <ExperienceForm />
      case 3:
        return <EducationForm />
      case 4:
        return <SkillsForm />
      case 5:
        return <ProjectsForm />
      case 6:
        return <ResumePreview />
      default:
        return <LandingPage />
    }
  }

  const showNavigation = currentStep >= 0
  const showCustomizationPanel = currentStep > 0 && currentStep < 6
  const showFeedbackBanner = currentStep !== -1 // Show on all pages except landing

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Startup Animation */}
      <StartupAnimation />

      {/* Feedback Banner */}
      {showFeedbackBanner && <FeedbackBanner />}

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Top Navigation - only show when not on landing page */}
      {showNavigation && (
        <div className="relative z-40" style={{ marginTop: showFeedbackBanner ? "60px" : "0" }}>
          <TopNavigation />
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10" style={{ paddingTop: showFeedbackBanner && currentStep !== -1 ? "60px" : "0" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Customization Panel */}
      {showCustomizationPanel && (
        <div className="relative z-40">
          <CustomizationPanel />
        </div>
      )}

      {/* Footer */}
      {currentStep === -1 && (
        <div className="relative z-10">
          <Footer />
        </div>
      )}
    </div>
  )
}
