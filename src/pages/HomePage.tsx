import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Target, TrendingUp, Users, Clock, Award, ArrowRight, Play, BarChart3 } from 'lucide-react'

const assessmentTypes = [
  {
    id: 'cognitive',
    title: 'Cognitive Assessment',
    description: 'Evaluate memory, attention, processing speed, and problem-solving abilities',
    duration: '15-20 min',
    questions: 25,
    icon: Brain,
    color: 'bg-blue-500',
    difficulty: 'Adaptive'
  },
  {
    id: 'personality',
    title: 'Personality Profile',
    description: 'Discover your personality traits, work style, and behavioral preferences',
    duration: '10-15 min',
    questions: 30,
    icon: Users,
    color: 'bg-purple-500',
    difficulty: 'Standard'
  },
  {
    id: 'skills',
    title: 'Skills Evaluation',
    description: 'Assess technical and soft skills relevant to your field or interests',
    duration: '20-25 min',
    questions: 35,
    icon: Target,
    color: 'bg-green-500',
    difficulty: 'Adaptive'
  },
  {
    id: 'aptitude',
    title: 'Aptitude Test',
    description: 'Measure logical reasoning, numerical ability, and verbal comprehension',
    duration: '25-30 min',
    questions: 40,
    icon: TrendingUp,
    color: 'bg-orange-500',
    difficulty: 'Progressive'
  }
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Adaptive Testing',
    description: 'Our advanced AI adjusts question difficulty in real-time based on your responses'
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Get comprehensive insights with visual reports and performance breakdowns'
  },
  {
    icon: Clock,
    title: 'Instant Results',
    description: 'Receive immediate feedback and detailed analysis upon completion'
  },
  {
    icon: Award,
    title: 'Certified Assessments',
    description: 'Industry-standard evaluations trusted by leading organizations worldwide'
  }
]

export default function HomePage() {
  const navigate = useNavigate()
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)

  const startAssessment = (assessmentId: string) => {
    navigate(`/assessment/${assessmentId}`)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">CogniGauge</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#assessments" className="text-gray-600 hover:text-gray-900 transition-colors">Assessments</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <Button onClick={() => navigate('/dashboard')} variant="outline">Dashboard</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Unlock Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Potential</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of assessment with our AI-powered platform. Get personalized insights, 
              adaptive testing, and instant results that help you understand your cognitive abilities and skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" onClick={() => document.getElementById('assessments')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3" onClick={() => navigate('/dashboard')}>
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CogniGauge?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven assessment methodologies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessments Section */}
      <section id="assessments" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Assessment</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive range of scientifically-backed assessments
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {assessmentTypes.map((assessment, index) => {
              const IconComponent = assessment.icon
              return (
                <Card 
                  key={assessment.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedAssessment === assessment.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedAssessment(assessment.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center justify-center w-12 h-12 ${assessment.color} rounded-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary">{assessment.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-2xl">{assessment.title}</CardTitle>
                    <CardDescription className="text-base">{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {assessment.duration}
                        </div>
                        <div className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {assessment.questions} questions
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={(e) => {
                        e.stopPropagation()
                        startAssessment(assessment.id)
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Assessment
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold">CogniGauge</span>
              </div>
              <p className="text-gray-400">
                Empowering individuals and organizations with AI-driven assessment solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Assessments</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Cognitive Tests</li>
                <li>Personality Profiles</li>
                <li>Skills Evaluation</li>
                <li>Aptitude Tests</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dashboard</li>
                <li>Analytics</li>
                <li>Reports</li>
                <li>API Access</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CogniGauge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}