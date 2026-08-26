import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  Truck,
  Shield
} from 'lucide-react'
import Button from '../components/common/Button'
import { isValidMobile } from '../utils/helpers'
import { centres } from '../data/mockData'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    setLoginError('')
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Mobile number or Farmer ID is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setLoginError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check for demo credentials
      const storedUsers = JSON.parse(localStorage.getItem('agriqueue_users') || '[]')
      
      let user = storedUsers.find(u => 
        (u.mobile === formData.identifier || u.farmerId === formData.identifier) &&
        u.password === formData.password
      )

      // Demo login
      if (!user && formData.identifier === 'FMR1001' && formData.password === 'farmer123') {
        user = {
          id: 'demo1',
          name: 'Demo Farmer',
          mobile: '9876543210',
          email: 'demo@farmer.com',
          farmerId: 'FMR1001',
          state: 'Tamil Nadu',
          district: 'Madurai',
          village: 'Demo Village',
          preferredCentre: centres[0],
          cropType: 'Paddy',
          estimatedQuantity: 500,
          role: 'farmer',
          password: 'farmer123'
        }
      }

      // Admin demo
      if (!user && formData.identifier === 'ADMIN001' && formData.password === 'admin123') {
        user = {
          id: 'admin1',
          name: 'Admin User',
          mobile: '9876543211',
          email: 'admin@agriqueue.gov.in',
          farmerId: 'ADMIN001',
          role: 'admin',
          password: 'admin123'
        }
      }

      if (!user) {
        setLoginError('Invalid credentials. Please try again.')
        setLoading(false)
        return
      }

      onLogin(user)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (error) {
      setLoginError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (type) => {
    if (type === 'farmer') {
      setFormData({ identifier: 'FMR1001', password: 'farmer123' })
    } else if (type === 'admin') {
      setFormData({ identifier: 'ADMIN001', password: 'admin123' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Login to your AgriQueue account</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number or Farmer ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="Enter mobile number or Farmer ID"
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                    errors.identifier ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.identifier && (
                <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full"
              loading={loading}
            >
              Login
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Demo Login</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                onClick={() => handleDemoLogin('farmer')}
                className="px-4 py-2 border border-green-200 bg-green-50 rounded-lg text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
              >
                Farmer Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="px-4 py-2 border border-blue-200 bg-blue-50 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Demo
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Demo Farmer: FMR1001 / farmer123 • Admin: ADMIN001 / admin123
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-700 font-medium hover:text-green-800 transition">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}