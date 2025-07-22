import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import HomePage from '@/pages/HomePage'
import AssessmentPage from '@/pages/AssessmentPage'
import DashboardPage from '@/pages/DashboardPage'
import ResultsPage from '@/pages/ResultsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment/:id" element={<AssessmentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App