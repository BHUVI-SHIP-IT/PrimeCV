"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useResume } from "@/lib/resume-context"
import { ArrowRight, Star, Sparkles, CheckCircle, FileText, Palette, Zap, Shield, UserX, Clock } from "lucide-react"
import { FeedbackSection } from "./feedback-section"
import { ThemeToggle } from "./theme-toggle"

export function LandingPage() {
  const { dispatch } = useResume()

  const handleGetStarted = () => {
    dispatch({ type: "SET_STEP", payload: 0 })
  }

  const features = [
    {
      icon: <UserX className="w-6 h-6" />,
      title: "No Signup Required",
      description: "Start building immediately. No accounts, no passwords, no hassle.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Professional Templates",
      description: "Choose from 9+ ATS-friendly templates designed by professionals",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Full Customization",
      description: "Customize colors, fonts, and layout to match your personal brand",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Download",
      description: "Download your resume as a high-quality PDF in seconds",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data stays in your browser. No servers, no tracking.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Ready in Minutes",
      description: "Create a professional resume in under 10 minutes",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Got my dream job at Google! The templates are incredibly professional and no signup needed!",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Best resume builder I've used. Clean, fast, and completely free. Started using it immediately!",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Love that I could just start building without creating an account. So user-friendly!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="relative z-20 border-b border-white/20 dark:border-gray-800/50 backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">PrimeCV</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors">by Bhuvaneswar</span>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#templates"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
              >
                Templates
              </a>
              <a
                href="#feedback"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
              >
                Feedback
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
              >
                Reviews
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Badge className="bg-green-50/80 dark:bg-green-900/30 backdrop-blur-sm text-green-700 dark:text-green-400 border-green-200/50 dark:border-green-700/50 px-3 py-1 text-sm font-bold shadow-sm transition-colors">
                <UserX className="w-3 h-3 mr-1" />
                No Signup Required
              </Badge>
              <Button
                onClick={handleGetStarted}
                className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Creator Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10"
          >
            <Badge className="bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm text-purple-800 dark:text-purple-400 border-purple-200/50 dark:border-purple-700/50 px-4 py-2 text-sm font-bold shadow-lg transition-colors">
              Created by Bhuvaneswar
            </Badge>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 shadow-sm transition-colors"
                  >
                    FREE ONLINE RESUME BUILDER
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-xs font-bold shadow-lg">
                    <UserX className="w-3 h-3 mr-1" />
                    NO SIGNUP NEEDED
                  </Badge>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-bold shadow-lg animate-pulse">
                    🚀 PROTOTYPE v1.0
                  </Badge>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
                  Build a job-winning resume <span className="text-blue-600 dark:text-blue-400">instantly</span>
                </h1>
                <div className="mt-4 inline-flex items-center gap-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm transition-colors">
                  <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors">
                    Crafted with ❤️ by
                  </span>
                  <span className="text-purple-700 dark:text-purple-400 font-bold transition-colors">Bhuvaneswar</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                  <span className="font-bold text-green-600 dark:text-green-400">No signup, no login, no hassle.</span>{" "}
                  Just click and start building your professional resume instantly. 100% free forever.
                </p>
                <div className="bg-green-50/80 dark:bg-green-900/30 backdrop-blur-sm border border-green-200/50 dark:border-green-700/50 rounded-lg p-4 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <UserX className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-bold text-green-800 dark:text-green-300 transition-colors">
                      Ultra User-Friendly
                    </span>
                  </div>
                  <p className="text-green-800 dark:text-green-300 text-sm transition-colors">
                    ✨ Click "Start now" → Choose template → Fill details → Download PDF. That's it!
                  </p>
                </div>
                <div className="bg-yellow-50/80 dark:bg-yellow-900/30 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50 rounded-lg p-4 transition-colors">
                  <p className="text-yellow-800 dark:text-yellow-300 font-medium text-sm transition-colors">
                    ⚡ This is our first prototype! Your feedback helps us improve PrimeCV for everyone.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full px-8 py-4 text-lg font-medium group shadow-xl hover:shadow-2xl transition-all duration-300 interactive-hover"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start instantly - no signup
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 pt-8"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white font-medium shadow-lg transition-colors"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors">
                    Loved by early users
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1 transition-colors">
                      No signup required!
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Resume Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 transition-colors">
                {/* Use actual template image */}
                <div className="aspect-[3/4]">
                  <img
                    src="/templates/tech.jpg"
                    alt="Professional Resume Template Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=600&width=450"
                    }}
                  />
                </div>

                {/* Floating testimonial */}
                <div className="absolute -bottom-4 -right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-lg p-4 border border-white/20 dark:border-gray-700/20 max-w-xs transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors">
                        Andrew Irwin
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">Product Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">
                    "No signup needed! Started building my resume immediately. This is a LIFESAVER 🤩"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm transition-colors"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Everything you need, zero barriers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors">
              Professional templates, powerful customization, and instant downloads - all completely free with no signup
              required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 card-hover-effect"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-sm transition-colors ${
                    feature.title === "No Signup Required"
                      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Professional templates for every industry
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors">
              Choose from our collection of ATS-friendly templates.{" "}
              <span className="font-bold text-green-600 dark:text-green-400">No signup needed</span> - just click and
              start customizing!
            </p>
          </motion.div>

          {/* Featured Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Modern Professional",
                category: "Tech & Business",
                image: "/templates/modern.webp",
                popular: true,
              },
              {
                name: "Tech Developer",
                category: "Technology & Engineering",
                image: "/templates/tech.jpg",
                popular: true,
              },
              {
                name: "Elegant Minimal",
                category: "Corporate & Finance",
                image: "/templates/elegant.webp",
              },
              {
                name: "Classic Professional",
                category: "Traditional Industries",
                image: "/templates/classic.jpg",
              },
              {
                name: "Bold Creative",
                category: "Design & Creative",
                image: "/templates/bold.jpg",
              },
              {
                name: "Clean Professional",
                category: "Healthcare & Education",
                image: "/templates/clean.png",
              },
            ].map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={handleGetStarted}
              >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden hover:shadow-2xl transition-all duration-300 card-hover-effect relative">
                  {template.popular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-medium z-10 shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800 transition-colors">
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=400&width=300"
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">{template.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Templates Preview */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 mb-12 border border-white/20 dark:border-gray-700/20 shadow-lg transition-colors">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                And many more templates...
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">
                Explore our full collection of professional resume templates
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Corporate Professional", image: "/templates/professional.avif" },
                { name: "Ultra Minimal", image: "/templates/minimal.avif" },
                { name: "Creative Portfolio", image: "/templates/creative.avif" },
                { name: "Executive Style", image: "/templates/modern.webp" },
              ].map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={handleGetStarted}
                >
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-sm border border-white/20 dark:border-gray-700/20 overflow-hidden hover:shadow-lg transition-all duration-300 card-hover-effect">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=300&width=225"
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm transition-colors">
                        {template.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full px-8 shadow-xl hover:shadow-2xl transition-all duration-300 interactive-hover"
            >
              Start Building - No Signup Required
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback">
        <FeedbackSection />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 relative">
        <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm transition-colors"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Loved by job seekers worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
              Join thousands who've landed their dream jobs with our resume builder.{" "}
              <span className="font-bold text-green-600 dark:text-green-400">No signup required!</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 card-hover-effect transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white transition-colors">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white transition-colors">
              Ready to build your winning resume?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
              Join thousands of successful job seekers.{" "}
              <span className="font-bold text-green-600 dark:text-green-400">No signup required</span> - create your
              professional resume in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full px-8 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 interactive-hover"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now - No Signup
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 transition-colors">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No account required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                100% free forever
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Instant download
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Privacy protected
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Creator Banner */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-purple-50/80 dark:bg-purple-900/20 backdrop-blur-sm transition-colors"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                B
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Bhuvaneswar</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Creator & Developer</p>
              </div>
            </div>
            <div className="md:ml-4 md:border-l md:border-purple-200 dark:md:border-purple-700 md:pl-8 transition-colors">
              <p className="text-purple-800 dark:text-purple-300 font-medium transition-colors">
                "I built PrimeCV to remove all barriers to professional resume creation. No signups, no logins, no
                friction - just pure focus on helping you land your dream job!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
