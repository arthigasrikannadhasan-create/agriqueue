import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  MapPin, 
  Home, 
  Building2,
  Sprout,
  Scale,
  Lock,
  Eye,
  EyeOff,
  Truck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import Button from '../components/common/Button'
import { centres, crops, districts, states } from '../data/mockData'
import { isValidMobile, isValidEmail, isValidAadhaar} from '../utils/helpers'

export default function Register({ onRegister }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    aadhaar: '',
    state: '',
    district: '',
    village: '',
    preferredCentre: '',
    cropType: '',
    estimatedQuantity: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    setRegisterError('')
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.mobile || !isValidMobile(formData.mobile)) {
      newErrors.mobile = 'Valid 10-digit mobile number is required'
    }
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Valid email address is required'
    }
    if (!formData.aadhaar || !isValidAadhaar(formData.aadhaar)) {
      newErrors.aadhaar = 'Valid 12-digit Aadhaar number is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.state) newErrors.state = 'Please select a state'
    if (!formData.district) newErrors.district = 'Please select a district'
    if (!formData.village.trim()) newErrors.village = 'Village name is required'
    if (!formData.preferredCentre) newErrors.preferredCentre = 'Please select a procurement centre'
    if (!formData.cropType) newErrors.cropType = 'Please select a crop type'
    if (!formData.estimatedQuantity || formData.estimatedQuantity < 1) {
      newErrors.estimatedQuantity = 'Please enter a valid quantity'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep3()) return

    setLoading(true)
    setRegisterError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newUser = {
        id: `FMR${Date.now()}`,
        ...formData,
        farmerId: `FMR${String(Math.floor(1000 + Math.random() * 9000))}`,
        role: 'farmer',
        preferredCentre: centres.find(c => c.id === formData.preferredCentre),
      }

      // Store user
      const users = JSON.parse(localStorage.getItem('agriqueue_users') || '[]')
      users.push(newUser)
      localStorage.setItem('agriqueue_users', JSON.stringify(users))

      onRegister(newUser)
      navigate('/dashboard')
    } catch (error) {
      setRegisterError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 gradient-green rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">Register as a farmer to get started</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition ${
                  s === step 
                    ? 'bg-green-700 text-white' 
                    : s < step 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-10 h-0.5 transition ${
                    s < step ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {registerError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {registerError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                          errors.mobile ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="farmer@example.com"
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      id="aadhaar"
                      name="aadhaar"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      placeholder="123456789012"
                      className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                        errors.aadhaar ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.aadhaar && <p className="text-red-500 text-xs mt-1">{errors.aadhaar}</p>}
                </div>

                <Button 
                  type="button" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={handleNext}
                  icon={<ChevronRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Next Step
                </Button>
              </div>
            )}

            {/* Step 2: Location & Crop Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none ${
                          errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select State</option>
                        {states.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                      District *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none ${
                          errors.district ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select District</option>
                        {districts.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
                    Village *
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      id="village"
                      name="village"
                      value={formData.village}
                      onChange={handleChange}
                      placeholder="Enter your village name"
                      className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                        errors.village ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village}</p>}
                </div>

                <div>
                  <label htmlFor="preferredCentre" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Procurement Centre *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id="preferredCentre"
                      name="preferredCentre"
                      value={formData.preferredCentre}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none ${
                        errors.preferredCentre ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Centre</option>
                      {centres.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  {errors.preferredCentre && <p className="text-red-500 text-xs mt-1">{errors.preferredCentre}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                      Crop Type *
                    </label>
                    <div className="relative">
                      <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        id="cropType"
                        name="cropType"
                        value={formData.cropType}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none ${
                          errors.cropType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Crop</option>
                        {crops.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    {errors.cropType && <p className="text-red-500 text-xs mt-1">{errors.cropType}</p>}
                  </div>

                  <div>
                    <label htmlFor="estimatedQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Quantity (kg) *
                    </label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        id="estimatedQuantity"
                        name="estimatedQuantity"
                        value={formData.estimatedQuantity}
                        onChange={handleChange}
                        placeholder="500"
                        min="1"
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                          errors.estimatedQuantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.estimatedQuantity && <p className="text-red-500 text-xs mt-1">{errors.estimatedQuantity}</p>}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleBack}
                    icon={<ChevronLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    variant="primary" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleNext}
                    icon={<ChevronRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Password */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
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
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                        errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleBack}
                    icon={<ChevronLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="flex-1"
                    loading={loading}
                  >
                    Register
                  </Button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-green-700 font-medium hover:text-green-800 transition">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}