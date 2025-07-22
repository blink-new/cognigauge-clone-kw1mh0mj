import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Brain, Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'rating'
  question: string
  options?: string[]
  correctAnswer?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const sampleQuestions: Record<string, Question[]> = {
  cognitive: [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'Which number comes next in the sequence: 2, 4, 8, 16, ?',
      options: ['24', '32', '30', '20'],
      correctAnswer: '32',
      category: 'Pattern Recognition',
      difficulty: 'medium'
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: 'If all roses are flowers and some flowers are red, which statement is definitely true?',
      options: ['All roses are red', 'Some roses are red', 'No roses are red', 'Some roses might be red'],
      correctAnswer: 'Some roses might be red',
      category: 'Logical Reasoning',
      difficulty: 'hard'
    },
    {
      id: '3',
      type: 'multiple-choice',
      question: 'What is the missing number: 3, 7, 15, 31, ?',
      options: ['47', '63', '55', '71'],
      correctAnswer: '63',
      category: 'Numerical Reasoning',
      difficulty: 'medium'
    }
  ],
  personality: [
    {
      id: '1',
      type: 'rating',
      question: 'I enjoy meeting new people and making connections',
      category: 'Extraversion',
      difficulty: 'easy'
    },
    {
      id: '2',
      type: 'rating',
      question: 'I prefer to plan things in advance rather than be spontaneous',
      category: 'Conscientiousness',
      difficulty: 'easy'
    },
    {
      id: '3',
      type: 'rating',
      question: 'I often worry about things that might go wrong',
      category: 'Neuroticism',
      difficulty: 'easy'
    }
  ],
  skills: [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'Which of the following is the best practice for project management?',
      options: ['Skip planning phase', 'Set unrealistic deadlines', 'Regular stakeholder communication', 'Avoid documentation'],
      correctAnswer: 'Regular stakeholder communication',
      category: 'Project Management',
      difficulty: 'medium'
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: 'What is the most important factor in effective team leadership?',
      options: ['Micromanaging tasks', 'Clear communication', 'Working alone', 'Avoiding feedback'],
      correctAnswer: 'Clear communication',
      category: 'Leadership',
      difficulty: 'medium'
    }
  ],
  aptitude: [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'If a train travels 120 miles in 2 hours, what is its average speed?',
      options: ['50 mph', '60 mph', '70 mph', '80 mph'],
      correctAnswer: '60 mph',
      category: 'Mathematical Reasoning',
      difficulty: 'easy'
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: 'Choose the word that best completes the analogy: Book is to Library as Car is to ?',
      options: ['Road', 'Garage', 'Driver', 'Engine'],
      correctAnswer: 'Garage',
      category: 'Verbal Reasoning',
      difficulty: 'medium'
    }
  ]
}

const assessmentTitles: Record<string, string> = {
  cognitive: 'Cognitive Assessment',
  personality: 'Personality Profile',
  skills: 'Skills Evaluation',
  aptitude: 'Aptitude Test'
}

export default function AssessmentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(1800) // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false)

  const questions = useMemo(() => id ? sampleQuestions[id] || [] : [], [id])
  const assessmentTitle = id ? assessmentTitles[id] || 'Assessment' : 'Assessment'

  const handleComplete = useCallback(() => {
    setIsCompleted(true)
    // Calculate score and navigate to results
    setTimeout(() => {
      navigate(`/results/${id}`, { state: { answers, questions } })
    }, 2000)
  }, [navigate, id, answers, questions])

  useEffect(() => {
    if (timeRemaining > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      handleComplete()
    }
  }, [timeRemaining, isCompleted, handleComplete])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (!id || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-gray-600 mb-4">Assessment not found</p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
            <p className="text-gray-600 mb-4">Processing your results...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">{assessmentTitle}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
              <Badge variant="outline">
                {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{currentQ.category}</Badge>
              <Badge variant={currentQ.difficulty === 'easy' ? 'default' : currentQ.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                {currentQ.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentQ.type === 'multiple-choice' && currentQ.options && (
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === 'rating' && (
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option} id={`rating-${index}`} />
                    <Label htmlFor={`rating-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === 'true-false' && (
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {['True', 'False'].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option} id={`tf-${index}`} />
                    <Label htmlFor={`tf-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[currentQ.id]}
          >
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}