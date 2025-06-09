"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
  direction: number
}

interface FloatingOrb {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

interface LightRay {
  id: number
  angle: number
  length: number
  color: string
  duration: number
  delay: number
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [floatingOrbs, setFloatingOrbs] = useState<FloatingOrb[]>([])
  const [lightRays, setLightRays] = useState<LightRay[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const isDark = theme === "dark"

    const lightColors = [
      "rgba(59, 130, 246, 0.15)", // Blue
      "rgba(147, 51, 234, 0.15)", // Purple
      "rgba(236, 72, 153, 0.15)", // Pink
      "rgba(34, 197, 94, 0.15)", // Green
      "rgba(245, 158, 11, 0.15)", // Orange
      "rgba(99, 102, 241, 0.15)", // Indigo
      "rgba(168, 85, 247, 0.15)", // Violet
      "rgba(14, 165, 233, 0.15)", // Sky
    ]

    const darkColors = [
      "rgba(59, 130, 246, 0.25)", // Brighter Blue
      "rgba(147, 51, 234, 0.25)", // Brighter Purple
      "rgba(236, 72, 153, 0.25)", // Brighter Pink
      "rgba(34, 197, 94, 0.25)", // Brighter Green
      "rgba(245, 158, 11, 0.25)", // Brighter Orange
      "rgba(99, 102, 241, 0.25)", // Brighter Indigo
      "rgba(168, 85, 247, 0.25)", // Brighter Violet
      "rgba(14, 165, 233, 0.25)", // Brighter Sky
    ]

    const lightGradients = [
      "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.1))",
      "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(245, 158, 11, 0.1))",
      "linear-gradient(225deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.1))",
      "linear-gradient(315deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.1))",
      "linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.1))",
    ]

    const darkGradients = [
      "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.15))",
      "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(245, 158, 11, 0.15))",
      "linear-gradient(225deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.15))",
      "linear-gradient(315deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.15))",
      "linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.15))",
    ]

    const colors = isDark ? darkColors : lightColors
    const gradientColors = isDark ? darkGradients : lightGradients

    // Create floating particles
    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
      direction: Math.random() * 360,
    }))

    // Create floating orbs
    const newFloatingOrbs: FloatingOrb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 60,
      color: gradientColors[Math.floor(Math.random() * gradientColors.length)],
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 10,
    }))

    // Create light rays
    const newLightRays: LightRay[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (360 / 12) * i,
      length: Math.random() * 200 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 8,
    }))

    setParticles(newParticles)
    setFloatingOrbs(newFloatingOrbs)
    setLightRays(newLightRays)
  }, [theme])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Background */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-blue-50 via-white via-purple-50 to-pink-50"
        }`}
      />

      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-60">
        <div
          className="absolute inset-0 mesh-background transition-all duration-1000"
          style={{
            background: isDark
              ? `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
            `
              : `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Dynamic Geometric Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0 transition-all duration-1000"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 60,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage: isDark
              ? `
              linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(147, 51, 234, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(236, 72, 153, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(34, 197, 94, 0.1) 75%)
            `
              : `
              linear-gradient(45deg, rgba(59, 130, 246, 0.03) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(147, 51, 234, 0.03) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(236, 72, 153, 0.03) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(34, 197, 94, 0.03) 75%)
            `,
            backgroundSize: "80px 80px",
            backgroundPosition: "0 0, 0 40px, 40px -40px, -40px 0px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      {floatingOrbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-xl transition-all duration-1000"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Light Rays from Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {lightRays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute origin-bottom transition-all duration-1000"
            style={{
              width: "2px",
              height: ray.length,
              background: `linear-gradient(to top, ${ray.color}, transparent)`,
              transform: `rotate(${ray.angle}deg)`,
            }}
            animate={{
              opacity: [0, isDark ? 1 : 0.8, 0],
              scaleY: [0.5, 1.2, 0.5],
              rotate: [ray.angle, ray.angle + 360],
            }}
            transition={{
              duration: ray.duration,
              delay: ray.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full transition-all duration-1000"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [-20, -150],
            x: [0, Math.sin(particle.direction) * 50, Math.cos(particle.direction) * 30, 0],
            rotate: [0, 360],
            scale: [1, 1.5, 0.8, 1],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Mouse-following Interactive Orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-1000"
        style={{
          background: isDark
            ? `radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.1), transparent)`
            : `radial-gradient(circle, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05), transparent)`,
          filter: "blur(40px)",
        }}
        animate={{
          x: mousePosition.x * 8 - 192,
          y: mousePosition.y * 8 - 192,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 30,
        }}
      />

      {/* Pulsing Energy Rings */}
      <div className="absolute top-1/4 left-1/4">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className={`absolute rounded-full border transition-all duration-1000 ${
              isDark ? "border-blue-400/40" : "border-blue-200/30"
            }`}
            style={{
              width: ring * 100,
              height: ring * 100,
              left: -(ring * 50),
              top: -(ring * 50),
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: isDark ? [0.4, 0.2, 0.4] : [0.3, 0.1, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + ring * 2,
              delay: ring * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      {[1, 2, 3, 4, 5].map((shape) => (
        <motion.div
          key={shape}
          className="absolute transition-all duration-1000"
          style={{
            left: `${20 + shape * 15}%`,
            top: `${10 + shape * 12}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + shape * 2,
            delay: shape * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {shape % 2 === 0 ? (
            <div
              className="w-8 h-8 rotate-45 transition-all duration-1000"
              style={{
                background: isDark
                  ? `linear-gradient(45deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.2))`
                  : `linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.1))`,
                opacity: isDark ? 0.3 : 0.2,
              }}
            />
          ) : (
            <div
              className="w-6 h-6 rounded-full transition-all duration-1000"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(34, 197, 94, 0.2))`
                  : `linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(34, 197, 94, 0.1))`,
                opacity: isDark ? 0.35 : 0.25,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Animated Wave Pattern */}
      <div
        className="absolute bottom-0 left-0 w-full h-64 overflow-hidden transition-all duration-1000"
        style={{ opacity: isDark ? 0.3 : 0.2 }}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-[200%] h-full transition-all duration-1000"
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            background: isDark
              ? `
              radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.4) 0%, transparent 70%),
              radial-gradient(ellipse at 25% bottom, rgba(147, 51, 234, 0.3) 0%, transparent 70%),
              radial-gradient(ellipse at 75% bottom, rgba(236, 72, 153, 0.3) 0%, transparent 70%)
            `
              : `
              radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.3) 0%, transparent 70%),
              radial-gradient(ellipse at 25% bottom, rgba(147, 51, 234, 0.2) 0%, transparent 70%),
              radial-gradient(ellipse at 75% bottom, rgba(236, 72, 153, 0.2) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      {/* Sparkle Effects */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${isDark ? "bg-white" : "bg-white"}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: isDark ? 0.8 : 0.6,
          }}
          animate={{
            opacity: [0, isDark ? 1 : 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}

      {/* Aurora Effect */}
      <div className="absolute inset-0 transition-all duration-1000" style={{ opacity: isDark ? 0.4 : 0.3 }}>
        <motion.div
          className="absolute inset-0 transition-all duration-1000"
          animate={{
            background: isDark
              ? [
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.15))",
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.1), rgba(34, 197, 94, 0.15))",
                  "linear-gradient(225deg, rgba(236, 72, 153, 0.15), rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.15))",
                  "linear-gradient(315deg, rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.15))",
                ]
              : [
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.1))",
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.05), rgba(34, 197, 94, 0.1))",
                  "linear-gradient(225deg, rgba(236, 72, 153, 0.1), rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.1))",
                  "linear-gradient(315deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.1))",
                ],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Bubbles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className={`absolute rounded-full border transition-all duration-1000 ${
            isDark ? "border-white/30" : "border-white/20"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${100 + Math.random() * 20}%`,
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(i) * 100],
            opacity: [0, isDark ? 0.8 : 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Radial Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full transition-all duration-1000">
        <div
          className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isDark
              ? "bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent"
              : "bg-gradient-radial from-blue-200/10 via-purple-200/5 to-transparent"
          }`}
        />
        <div
          className={`absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isDark
              ? "bg-gradient-radial from-purple-500/20 via-pink-500/10 to-transparent"
              : "bg-gradient-radial from-purple-200/10 via-pink-200/5 to-transparent"
          }`}
        />
        <div
          className={`absolute bottom-0 left-1/2 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isDark
              ? "bg-gradient-radial from-pink-500/20 via-green-500/10 to-transparent"
              : "bg-gradient-radial from-pink-200/10 via-green-200/5 to-transparent"
          }`}
        />
        <div
          className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl transition-all duration-1000 ${
            isDark
              ? "bg-gradient-radial from-green-500/20 via-blue-500/10 to-transparent"
              : "bg-gradient-radial from-green-200/10 via-blue-200/5 to-transparent"
          }`}
        />
      </div>
    </div>
  )
}
