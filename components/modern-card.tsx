"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface ModernCardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  className?: string
  delay?: number
}

export function ModernCard({ children, title, subtitle, icon, className = "", delay = 0 }: ModernCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-0 shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/10 hover:shadow-3xl hover:shadow-blue-500/20 dark:hover:shadow-purple-500/20 transition-all duration-500">
        {(title || subtitle || icon) && (
          <CardHeader className="pb-4">
            {(title || icon) && (
              <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {icon}
                {title}
              </CardTitle>
            )}
            {subtitle && <p className="text-gray-600 dark:text-gray-400 text-lg">{subtitle}</p>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  )
}
