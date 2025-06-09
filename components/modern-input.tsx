"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type React from "react"

interface ModernInputProps {
  label: string
  icon?: React.ReactNode
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  rows?: number
  className?: string
}

export function ModernInput({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  rows,
  className = "",
}: ModernInputProps) {
  const InputComponent = rows ? Textarea : Input

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`space-y-2 ${className}`}>
      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {icon}
        {label}
      </Label>
      <InputComponent
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-800/70"
      />
    </motion.div>
  )
}
