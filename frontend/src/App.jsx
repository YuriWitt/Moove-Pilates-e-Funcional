import { useState } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CadastroAlunoPage from './pages/CadastroAlunoPage'
import AgendaPage from './pages/AgendaPage'
import FrequenciaPage from './pages/FrequenciaPage'
import FinanceiroPage from './pages/FinanceiroPage'
import CobrancaPage from './pages/CobrancaPage'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-cream-50 md:h-screen">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Navbar onLogout={() => setIsLoggedIn(false)} />
          <main className="flex-1 overflow-auto pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/cadastro" element={<CadastroAlunoPage />} />
              <Route path="/agenda" element={<AgendaPage />} />
              <Route path="/frequencia" element={<FrequenciaPage />} />
              <Route path="/financeiro" element={<FinanceiroPage />} />
              <Route path="/cobranca" element={<CobrancaPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
