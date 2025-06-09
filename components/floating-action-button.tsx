"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type React from "react"

interface FloatingActionButtonProps {
  onClick: () => void
  icon: React.ReactNode
  label: string
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function FloatingActionButton({
  onClick,
  icon,
  label,
  variant = "primary",
  size = "md",
  className = "",
}: FloatingActionButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white",
    secondary: "bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white",
  }

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={className}>
      <Button
        onClick={onClick}
        className={`${variants[variant]} ${sizes[size]} rounded-full shadow-lg backdrop-blur-sm border-0 transition-all duration-300 hover:shadow-xl`}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Button>
    </motion.div>
  )
}
