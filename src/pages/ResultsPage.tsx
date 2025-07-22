import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Trophy, Target, TrendingUp, ArrowLeft, Download, Share2, BarChart3 } from 'lucide-react'

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'rating'
  question: string
  options?: string[]
  correctAnswer?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const assessmentTitles: Record<string, string> = {
  cognitive: 'Cognitive Assessment',
  personality: 'Personality Profile',
  skills: 'Skills Evaluation',
  aptitude: 'Aptitude Test'
}

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

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  
  const { answers, questions } = location.state as { answers: Record<string, string>, questions: Question[] } || { answers: {}, questions: [] }
  const assessmentTitle = id ? assessmentTitles[id] || 'Assessment' : 'Assessment'

  // Calculate results based on assessment type
  const calculateResults = () => {
    if (!questions.length) return { overallScore: 0, categoryScores: {}, insights: [] }

    if (id === 'cognitive' || id === 'aptitude' || id === 'skills') {
      // For knowledge-based assessments, calculate correct answers
      let correctAnswers = 0
      const categoryScores: Record<string, { correct: number, total: number }> = {}

      questions.forEach(question => {
        const userAnswer = answers[question.id]
        const isCorrect = userAnswer === question.correctAnswer
        
        if (isCorrect) correctAnswers++

        if (!categoryScores[question.category]) {
          categoryScores[question.category] = { correct: 0, total: 0 }
        }
        categoryScores[question.category].total++
        if (isCorrect) categoryScores[question.category].correct++
      })

      const overallScore = Math.round((correctAnswers / questions.length) * 100)
      const categoryPercentages: Record<string, number> = {}
      
      Object.entries(categoryScores).forEach(([category, scores]) => {
        categoryPercentages[category] = Math.round((scores.correct / scores.total) * 100)
      })

      const insights = [
        `You answered ${correctAnswers} out of ${questions.length} questions correctly.`,
        `Your strongest area is ${Object.entries(categoryPercentages).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}.`,
        overallScore >= 80 ? 'Excellent performance! You demonstrate strong capabilities in this area.' : 
        overallScore >= 60 ? 'Good performance with room for improvement in some areas.' :
        'Consider additional practice and study to improve your performance.'
      ]

      return { overallScore, categoryScores: categoryPercentages, insights }
    } else {
      // For personality assessments, create personality profile
      const categoryScores: Record<string, number[]> = {}
      
      questions.forEach(question => {
        const userAnswer = answers[question.id]
        let score = 0
        
        switch (userAnswer) {
          case 'Strongly Disagree': score = 1; break
          case 'Disagree': score = 2; break
          case 'Neutral': score = 3; break
          case 'Agree': score = 4; break
          case 'Strongly Agree': score = 5; break
        }

        if (!categoryScores[question.category]) {
          categoryScores[question.category] = []
        }
        categoryScores[question.category].push(score)
      })

      const categoryAverages: Record<string, number> = {}
      Object.entries(categoryScores).forEach(([category, scores]) => {
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
        categoryAverages[category] = Math.round((average / 5) * 100)
      })

      const overallScore = Math.round(Object.values(categoryAverages).reduce((sum, score) => sum + score, 0) / Object.values(categoryAverages).length)

      const insights = [
        'Your personality profile has been analyzed across multiple dimensions.',
        `Your highest trait is ${Object.entries(categoryAverages).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}.`,
        'This assessment provides insights into your behavioral preferences and work style.'
      ]

      return { overallScore, categoryScores: categoryAverages, insights }
    }
  }

  const results = calculateResults()

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-gray-600 mb-4">No results found</p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">{assessmentTitle} Results</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
                    {results.overallScore}%
                  </div>
                </div>
                <Trophy className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">
              {getScoreLabel(results.overallScore)}
            </CardTitle>
            <CardDescription className="text-lg">
              Your overall performance on the {assessmentTitle.toLowerCase()}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Category Breakdown
              </CardTitle>
              <CardDescription>
                Performance across different skill areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(results.categoryScores).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{category}</span>
                    <Badge variant={score >= 80 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}>
                      {score}%
                    </Badge>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Insights & Recommendations
              </CardTitle>
              <CardDescription>
                Personalized feedback based on your performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Detailed Analysis
            </CardTitle>
            <CardDescription>
              Question-by-question breakdown of your responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect = id === 'personality' ? true : userAnswer === question.correctAnswer
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <Badge variant="secondary">{question.category}</Badge>
                          <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                        <div className="text-sm text-gray-600">
                          <p><strong>Your answer:</strong> {userAnswer || 'Not answered'}</p>
                          {question.correctAnswer && (
                            <p><strong>Correct answer:</strong> {question.correctAnswer}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {id === 'personality' ? (
                          <Badge variant="default">Answered</Badge>
                        ) : (
                          <Badge variant={isCorrect ? 'default' : 'destructive'}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            View Dashboard
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/')}>
            Take Another Assessment
          </Button>
        </div>
      </div>
    </div>
  )
}