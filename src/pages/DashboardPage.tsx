import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Trophy, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Users, 
  BarChart3,
  Plus,
  ArrowLeft,
  Award,
  Activity
} from 'lucide-react'

// Mock data for demonstration
const mockAssessmentHistory = [
  {
    id: 'cognitive-1',
    type: 'cognitive',
    title: 'Cognitive Assessment',
    date: '2024-01-20',
    score: 85,
    duration: '18 min',
    status: 'completed'
  },
  {
    id: 'personality-1',
    type: 'personality',
    title: 'Personality Profile',
    date: '2024-01-18',
    score: 92,
    duration: '12 min',
    status: 'completed'
  },
  {
    id: 'skills-1',
    type: 'skills',
    title: 'Skills Evaluation',
    date: '2024-01-15',
    score: 78,
    duration: '22 min',
    status: 'completed'
  },
  {
    id: 'aptitude-1',
    type: 'aptitude',
    title: 'Aptitude Test',
    date: '2024-01-12',
    score: 88,
    duration: '25 min',
    status: 'completed'
  }
]

const mockSkillProgress = [
  { skill: 'Logical Reasoning', current: 85, target: 90, improvement: '+5%' },
  { skill: 'Numerical Ability', current: 78, target: 85, improvement: '+3%' },
  { skill: 'Verbal Comprehension', current: 92, target: 95, improvement: '+2%' },
  { skill: 'Pattern Recognition', current: 88, target: 90, improvement: '+4%' },
  { skill: 'Problem Solving', current: 82, target: 88, improvement: '+6%' }
]

const mockRecommendations = [
  {
    title: 'Improve Numerical Reasoning',
    description: 'Focus on mathematical problem-solving exercises to boost your numerical ability score.',
    priority: 'high',
    estimatedTime: '2-3 weeks'
  },
  {
    title: 'Practice Pattern Recognition',
    description: 'Regular practice with sequence and pattern problems will enhance your cognitive flexibility.',
    priority: 'medium',
    estimatedTime: '1-2 weeks'
  },
  {
    title: 'Develop Leadership Skills',
    description: 'Consider taking leadership assessments to complement your technical skills profile.',
    priority: 'low',
    estimatedTime: '3-4 weeks'
  }
]

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

const getScoreLabel = (score: number) => {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Average'
  return 'Below Average'
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('overview')

  const averageScore = Math.round(
    mockAssessmentHistory.reduce((sum, assessment) => sum + assessment.score, 0) / mockAssessmentHistory.length
  )

  const totalAssessments = mockAssessmentHistory.length
  const totalTime = mockAssessmentHistory.reduce((sum, assessment) => {
    const minutes = parseInt(assessment.duration.split(' ')[0])
    return sum + minutes
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Dashboard</span>
              </div>
            </div>
            <Button onClick={() => navigate('/')}>
              <Plus className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</p>
                  <p className="text-xs text-gray-500">{getScoreLabel(averageScore)}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assessments Taken</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAssessments}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Time</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.floor(totalTime / 60)}h {totalTime % 60}m</p>
                  <p className="text-xs text-gray-500">Assessment time</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improvement</p>
                  <p className="text-2xl font-bold text-green-600">+12%</p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Assessments
                  </CardTitle>
                  <CardDescription>Your latest assessment results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAssessmentHistory.slice(0, 3).map((assessment) => (
                      <div key={assessment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{assessment.title}</p>
                          <p className="text-sm text-gray-500">{assessment.date} • {assessment.duration}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={assessment.score >= 80 ? 'default' : assessment.score >= 60 ? 'secondary' : 'destructive'}>
                            {assessment.score}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skill Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Skill Overview
                  </CardTitle>
                  <CardDescription>Your current skill levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSkillProgress.slice(0, 3).map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-green-600">{skill.improvement}</span>
                            <Badge variant="outline">{skill.current}%</Badge>
                          </div>
                        </div>
                        <Progress value={skill.current} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Continue your assessment journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/assessment/cognitive')}
                  >
                    <Brain className="h-6 w-6" />
                    <span>Cognitive Test</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/assessment/personality')}
                  >
                    <Users className="h-6 w-6" />
                    <span>Personality</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/assessment/skills')}
                  >
                    <Target className="h-6 w-6" />
                    <span>Skills Test</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/assessment/aptitude')}
                  >
                    <TrendingUp className="h-6 w-6" />
                    <span>Aptitude Test</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
                <CardDescription>Complete record of all your assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAssessmentHistory.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Brain className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{assessment.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {assessment.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {assessment.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={assessment.score >= 80 ? 'default' : assessment.score >= 60 ? 'secondary' : 'destructive'}>
                          {assessment.score}%
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Progress Tracking</CardTitle>
                <CardDescription>Monitor your improvement across different skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockSkillProgress.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{skill.skill}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600">{skill.improvement}</span>
                          <Badge variant="outline">{skill.current}% / {skill.target}%</Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={skill.current} className="h-3" />
                        <div 
                          className="absolute top-0 h-3 w-1 bg-red-400 rounded-full"
                          style={{ left: `${skill.target}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current: {skill.current}%</span>
                        <span>Target: {skill.target}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>AI-powered suggestions to improve your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{rec.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'secondary' : 'default'}>
                              {rec.priority} priority
                            </Badge>
                            <span className="text-xs text-gray-500">Est. {rec.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="mt-2">
                        Start Improvement Plan
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}