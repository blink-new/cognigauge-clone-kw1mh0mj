import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Brain,
  Network,
  Cpu,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Eye,
  Target,
  Layers,
  GitBranch,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  Download,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react'

const mlModels = [
  {
    id: 'cognitive-load',
    name: 'Cognitive Load Predictor',
    type: 'Neural Network',
    accuracy: 94.2,
    status: 'active',
    description: 'Predicts cognitive workload from multimodal biomarker inputs',
    lastTrained: '2 hours ago',
    dataPoints: 15420,
    layers: 8,
    parameters: '2.3M'
  },
  {
    id: 'attention-tracker',
    name: 'Attention State Classifier',
    type: 'Transformer',
    accuracy: 91.7,
    status: 'active',
    description: 'Classifies attention states from behavioral patterns',
    lastTrained: '6 hours ago',
    dataPoints: 12890,
    layers: 12,
    parameters: '4.1M'
  },
  {
    id: 'fatigue-detector',
    name: 'Fatigue Detection Model',
    type: 'CNN-LSTM',
    accuracy: 88.9,
    status: 'training',
    description: 'Detects early signs of cognitive fatigue',
    lastTrained: '1 day ago',
    dataPoints: 9340,
    layers: 6,
    parameters: '1.8M'
  },
  {
    id: 'performance-predictor',
    name: 'Performance Forecaster',
    type: 'Time Series',
    accuracy: 86.4,
    status: 'active',
    description: 'Forecasts cognitive performance trends',
    lastTrained: '4 hours ago',
    dataPoints: 18750,
    layers: 4,
    parameters: '890K'
  }
]

const neuralNetworkLayers = [
  { name: 'Input Layer', neurons: 128, activation: 'Linear', description: 'Biomarker feature inputs' },
  { name: 'Hidden Layer 1', neurons: 256, activation: 'ReLU', description: 'Feature extraction' },
  { name: 'Hidden Layer 2', neurons: 512, activation: 'ReLU', description: 'Pattern recognition' },
  { name: 'Hidden Layer 3', neurons: 256, activation: 'ReLU', description: 'Feature combination' },
  { name: 'Hidden Layer 4', neurons: 128, activation: 'ReLU', description: 'Dimensionality reduction' },
  { name: 'Hidden Layer 5', neurons: 64, activation: 'ReLU', description: 'Final processing' },
  { name: 'Output Layer', neurons: 10, activation: 'Softmax', description: 'Cognitive state classification' }
]

const predictions = [
  {
    metric: 'Cognitive Load',
    current: 72,
    predicted: 68,
    confidence: 94,
    trend: 'decreasing',
    timeframe: 'Next 30 minutes'
  },
  {
    metric: 'Attention Level',
    current: 85,
    predicted: 88,
    confidence: 91,
    trend: 'increasing',
    timeframe: 'Next 15 minutes'
  },
  {
    metric: 'Fatigue Index',
    current: 23,
    predicted: 31,
    confidence: 87,
    trend: 'increasing',
    timeframe: 'Next 45 minutes'
  },
  {
    metric: 'Performance Score',
    current: 87,
    predicted: 84,
    confidence: 89,
    trend: 'decreasing',
    timeframe: 'Next hour'
  }
]

export default function MLInsightsPage() {
  const navigate = useNavigate()
  const [selectedModel, setSelectedModel] = useState('cognitive-load')
  const [isTraining, setIsTraining] = useState(false)

  const currentModel = mlModels.find(model => model.id === selectedModel)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'training': return 'bg-blue-100 text-blue-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <div className="h-4 w-4 rounded-full bg-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">ML Insights</h1>
                  <p className="text-xs text-muted-foreground">Neural network analysis and predictions</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsTraining(!isTraining)}
                disabled={isTraining}
              >
                {isTraining ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Training...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Retrain Models
                  </>
                )}
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models">ML Models</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          {/* ML Models Tab */}
          <TabsContent value="models" className="space-y-6">
            {/* Model Overview Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mlModels.map((model) => (
                <Card 
                  key={model.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedModel === model.id ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Network className="h-5 w-5 text-primary" />
                      <Badge className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <CardDescription className="text-sm">{model.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-mono font-semibold">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} max={100} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {model.parameters} parameters
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Model Details */}
            {currentModel && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Network className="h-5 w-5 text-primary" />
                        <span>{currentModel.name}</span>
                      </CardTitle>
                      <CardDescription>{currentModel.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Performance Metrics */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Performance Metrics</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-muted/20 rounded-lg p-4">
                              <div className="text-2xl font-bold text-foreground">{currentModel.accuracy}%</div>
                              <div className="text-sm text-muted-foreground">Accuracy</div>
                            </div>
                            <div className="bg-muted/20 rounded-lg p-4">
                              <div className="text-2xl font-bold text-foreground">{currentModel.dataPoints.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">Training Samples</div>
                            </div>
                            <div className="bg-muted/20 rounded-lg p-4">
                              <div className="text-2xl font-bold text-foreground">{currentModel.parameters}</div>
                              <div className="text-sm text-muted-foreground">Parameters</div>
                            </div>
                          </div>
                        </div>

                        {/* Model Visualization */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Model Performance</h4>
                          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                              <p className="text-lg font-medium">Training & Validation Curves</p>
                              <p className="text-sm">Loss, accuracy, and validation metrics over epochs</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Model Info */}
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Model Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Type</span>
                          <span className="text-sm font-medium">{currentModel.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Layers</span>
                          <span className="text-sm font-medium">{currentModel.layers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge className={getStatusColor(currentModel.status)}>
                            {currentModel.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Trained</span>
                          <span className="text-sm font-medium">{currentModel.lastTrained}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Play className="h-4 w-4 mr-2" />
                          Run Inference
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Export Model
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {predictions.map((prediction, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{prediction.metric}</CardTitle>
                      {getTrendIcon(prediction.trend)}
                    </div>
                    <CardDescription>{prediction.timeframe}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-muted-foreground">Current</div>
                          <div className="text-2xl font-bold text-foreground">{prediction.current}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Predicted</div>
                          <div className="text-2xl font-bold text-primary">{prediction.predicted}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="font-mono">{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} max={100} className="h-2" />
                      </div>
                      
                      <div className="h-24 bg-muted/20 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="h-8 w-8 mx-auto mb-1 opacity-50" />
                          <p className="text-xs">Prediction timeline</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Prediction Accuracy */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Prediction Accuracy Over Time</span>
                </CardTitle>
                <CardDescription>How accurate our ML predictions have been</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Prediction vs Reality</p>
                    <p className="text-sm">Historical accuracy of cognitive state predictions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <span>Neural Network Architecture</span>
                </CardTitle>
                <CardDescription>Cognitive Load Predictor model structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {neuralNetworkLayers.map((layer, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold text-foreground">{layer.name}</div>
                        <div className="text-sm text-muted-foreground">{layer.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm text-foreground">{layer.neurons} neurons</div>
                        <div className="text-xs text-muted-foreground">{layer.activation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Flow */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <span>Data Flow Pipeline</span>
                </CardTitle>
                <CardDescription>How biomarker data flows through the ML pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Network className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">ML Pipeline Visualization</p>
                    <p className="text-sm">Data preprocessing → Feature extraction → Model inference → Output</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    <span>Training Status</span>
                  </CardTitle>
                  <CardDescription>Current model training progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Epoch</span>
                      <span className="font-mono text-sm">47 / 100</span>
                    </div>
                    <Progress value={47} max={100} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Training Loss</div>
                        <div className="font-mono font-semibold">0.0234</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Validation Loss</div>
                        <div className="font-mono font-semibold">0.0298</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Training Acc</div>
                        <div className="font-mono font-semibold">94.2%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Validation Acc</div>
                        <div className="font-mono font-semibold">91.8%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Training Metrics</span>
                  </CardTitle>
                  <CardDescription>Real-time training performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <LineChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Live training metrics</p>
                      <p className="text-xs">Loss and accuracy curves update in real-time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Training Configuration */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Training Configuration</span>
                </CardTitle>
                <CardDescription>Current hyperparameters and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Optimization</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Optimizer</span>
                        <span className="font-mono">Adam</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Learning Rate</span>
                        <span className="font-mono">0.001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Batch Size</span>
                        <span className="font-mono">32</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Regularization</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dropout</span>
                        <span className="font-mono">0.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">L2 Penalty</span>
                        <span className="font-mono">0.0001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Early Stopping</span>
                        <span className="font-mono">Enabled</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Data</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Train Split</span>
                        <span className="font-mono">80%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Validation Split</span>
                        <span className="font-mono">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Augmentation</span>
                        <span className="font-mono">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}