"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="relative bg-white border-t border-gray-200 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Creator */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">PrimeCV</h3>
                <p className="text-sm text-gray-600">Free Resume Builder</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">Created by:</span>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Bhuvaneswar
                </span>
              </div>
              <p className="text-gray-600">
                A powerful resume builder designed to help job seekers create professional resumes for free.
              </p>
            </div>
            <div className="flex items-center text-lg text-gray-600">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="mx-2"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </motion.div>
              <span>by</span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="ml-2 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
              >
                Bhuvaneswar
              </motion.span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} PrimeCV by <span className="font-bold text-purple-700">Bhuvaneswar</span>. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
