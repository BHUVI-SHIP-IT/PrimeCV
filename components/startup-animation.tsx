"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { FileText, Sparkles, Zap, Star } from "lucide-react"

export function StartupAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Check if animation has been shown in this session
    const hasShownAnimation = sessionStorage.getItem("primecv-startup-shown")

    if (hasShownAnimation) {
      setIsVisible(false)
      return
    }

    const steps = [
      { delay: 0, duration: 800 }, // Logo appears
      { delay: 800, duration: 600 }, // Brand name
      { delay: 1400, duration: 600 }, // Tagline
      { delay: 2000, duration: 800 }, // Features
      { delay: 2800, duration: 600 }, // Final transition
    ]

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1)
      }, step.delay)
    })

    // Hide animation and mark as shown
    setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem("primecv-startup-shown", "true")
    }, 3600)
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Sparkle Effects */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}

          {/* Geometric Shapes */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className={`absolute ${i % 2 === 0 ? "w-8 h-8 rotate-45" : "w-6 h-6 rounded-full"} bg-white/5 border border-white/20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={currentStep >= 1 ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              {/* Logo Background Glow */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={currentStep >= 1 ? { scale: 1.5, opacity: 0.3 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute inset-0 bg-white rounded-full blur-xl"
              />

              {/* Main Logo */}
              <div className="relative w-24 h-24 mx-auto bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={currentStep >= 1 ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <FileText className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              {/* Orbiting Elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={currentStep >= 1 ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute inset-0"
              >
                {[Sparkles, Zap, Star].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: "-16px",
                      marginTop: "-16px",
                    }}
                    animate={{
                      rotate: [0, 360],
                      x: [0, Math.cos((index * 120 * Math.PI) / 180) * 60],
                      y: [0, Math.sin((index * 120 * Math.PI) / 180) * 60],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: index * 0.3,
                    }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={currentStep >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4"
          >
            <h1 className="text-6xl font-bold mb-2">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={currentStep >= 2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-block"
              >
                Prime
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={currentStep >= 2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="inline-block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
              >
                CV
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={currentStep >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-white/80 text-lg font-medium"
            >
              by Bhuvaneswar
            </motion.p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={currentStep >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <p className="text-2xl font-medium text-white/90 max-w-md mx-auto leading-relaxed">
              Build professional resumes
              <br />
              <span className="text-yellow-300 font-bold">instantly, for free</span>
            </p>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={currentStep >= 4 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {[
              { icon: "🚀", text: "No Signup" },
              { icon: "⚡", text: "Instant Download" },
              { icon: "🎨", text: "9+ Templates" },
              { icon: "🔒", text: "Privacy First" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 10 }}
                animate={currentStep >= 4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
              >
                <span className="text-lg mr-2">{feature.icon}</span>
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={currentStep >= 4 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="max-w-xs mx-auto"
          >
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={currentStep >= 4 ? { width: "100%" } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={currentStep >= 4 ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-white/70 text-sm mt-2"
            >
              Loading your resume builder...
            </motion.p>
          </motion.div>
        </div>

        {/* Pulse Effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={currentStep >= 1 ? { scale: [1, 2, 1], opacity: [0.3, 0, 0.3] } : {}}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-white rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: "200px",
            height: "200px",
            marginLeft: "-100px",
            marginTop: "-100px",
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
