"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ExternalLink, Users, Zap, Target, CheckCircle, ArrowRight, ThumbsUp } from "lucide-react"

export function FeedbackSection() {
  // Your actual Google Form URL
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdeI21NmletXB-3exHZ6NiCTdxyaxx9KNqU9CTn4Gnc1Wttcg/viewform?usp=dialog"

  // Form is now ready!
  const FORM_IS_READY = true

  const handleFeedbackClick = () => {
    window.open(GOOGLE_FORM_URL, "_blank")
  }

  const feedbackAreas = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Template Design",
      description: "Rate our resume templates and suggest new designs you'd like to see",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "User Experience",
      description: "Tell us about your experience - what worked well and what didn't",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Feature Feedback",
      description: "Which features did you love? What's missing that would make PrimeCV better?",
    },
  ]

  const prototypeFeatures = [
    "9+ Professional Templates",
    "Real-time Preview",
    "PDF Export",
    "Custom Colors & Fonts",
    "Photo Upload Support",
    "Mobile Responsive Design",
  ]

  const formQuestions = [
    "Rate your overall experience (1-5 stars)",
    "Which features you liked most",
    "Any confusing or difficult aspects",
    "Suggestions for improvement",
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 backdrop-blur-sm"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
              🚀 PROTOTYPE v1.0
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
              ✅ FEEDBACK FORM READY
            </Badge>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Help Us Build the Perfect Resume Creator
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            PrimeCV is in its <span className="font-bold text-purple-600">first prototype stage</span>! Your feedback is
            invaluable in shaping the future of this free resume builder. Tell us what you love, what needs improvement,
            and what features you'd like to see next.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Current Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  What's Already Built
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {prototypeFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-green-50/80 rounded-lg border border-green-200/50"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Areas */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">We'd Love Your Input On:</h3>
              {feedbackAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {area.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{area.title}</h4>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Feedback Form CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 text-white shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  Share Your Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <p className="text-white/90 text-lg leading-relaxed">
                  Your feedback drives our development! Help us understand what works, what doesn't, and what features
                  would make PrimeCV even better.
                </p>

                <div className="bg-green-500/20 border border-green-300/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-green-100">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Feedback form is ready! Quick 2-minute survey.</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold mb-3">Our form covers:</h4>
                  {formQuestions.map((question, index) => (
                    <div key={question} className="flex items-center gap-3 text-white/90">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm">{question}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleFeedbackClick}
                  size="lg"
                  className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Open Feedback Form
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-white/70 text-sm text-center">Takes less than 2 minutes • Completely anonymous</p>
              </CardContent>
            </Card>

            {/* Creator Message */}
            <Card className="bg-white/80 backdrop-blur-xl shadow-lg border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                    B
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">A Message from Bhuvaneswar</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      "I built PrimeCV to democratize professional resume creation. This is just the beginning! Your
                      feedback will directly influence the next features and improvements. Together, we can make the
                      best free resume builder out there. 🚀"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-xl rounded-lg p-4 text-center border border-white/20 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">v1.0</div>
                <div className="text-sm text-gray-600">Current Version</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-lg p-4 text-center border border-white/20 shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Free Forever</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Every Piece of Feedback Matters</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Whether it's a bug report, feature request, or just letting us know what you think - your input shapes the
              future of PrimeCV.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleFeedbackClick}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Give Feedback Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Join the community building the future of resume creation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
