import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Import all pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import BookSlot from './pages/BookSlot'
import Queue from './pages/Queue'
import Procurement from './pages/Procurement'
import Payments from './pages/Payments'
import Notifications from './pages/Notifications'
import Centres from './pages/Centres'
import Admin from './pages/Admin'

// Import Layout
import Layout from './components/layout/Layout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('agriqueue_user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem('agriqueue_user', JSON.stringify(userData))
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('agriqueue_user')
    localStorage.removeItem('agriqueue_bookings')
    localStorage.removeItem('agriqueue_notifications')
    setUser(null)
    setIsAuthenticated(false)
  }

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register onRegister={login} />} />
        
        {/* Protected Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <Dashboard user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-slot"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <BookSlot user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/queue"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <Queue user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/procurement"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <Procurement user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <Payments user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <Notifications user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/centres"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <Centres user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout user={user} logout={logout}>
                <Admin user={user} />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App