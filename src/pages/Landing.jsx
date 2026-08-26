import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Users, 
  ClipboardList, 
  CreditCard, 
  Bell, 
  Clock,
  ArrowRight,
  CheckCircle,
  Truck,
  TrendingUp
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from '../components/common/Button'

export default function Landing() {
  const [stats, setStats] = useState([
    { value: 0, target: 10000, label: 'Farmers Registered', suffix: '+' },
    { value: 0, target: 50, label: 'Procurement Centres', suffix: '+' },
    { value: 0, target: 25000, label: 'Slots Managed', suffix: '+' },
    { value: 0, target: 40, label: 'Reduced Waiting Time', suffix: '%' },
  ])

  useEffect(() => {
    const animateStats = () => {
      stats.forEach((stat, index) => {
        const interval = setInterval(() => {
          setStats(prev => {
            const newStats = [...prev]
            const increment = Math.max(1, Math.floor(stat.target / 50))
            if (newStats[index].value < stat.target) {
              newStats[index].value = Math.min(newStats[index].value + increment, stat.target)
            } else {
              clearInterval(interval)
            }
            return newStats
          })
        }, 30)
      })
    }
    animateStats()
  }, [])

  const features = [
    { icon: Calendar, title: 'Easy Slot Booking', description: 'Book your procurement slot in just a few clicks' },
    { icon: Users, title: 'Real-Time Queue', description: 'View your queue position and estimated wait time' },
    { icon: ClipboardList, title: 'Procurement Tracking', description: 'Track your procurement status from start to finish' },
    { icon: CreditCard, title: 'Payment Tracking', description: 'Monitor your payment status and history' },
    { icon: Bell, title: 'Notifications', description: 'Get real-time updates about your procurement' },
    { icon: Clock, title: 'Reduced Waiting Time', description: 'Save time with efficient slot management' },
  ]

  const steps = [
    { number: '1', title: 'Register', description: 'Create your farmer account' },
    { number: '2', title: 'Select Centre', description: 'Choose your preferred procurement centre' },
    { number: '3', title: 'Book Slot', description: 'Pick a date and time slot' },
    { number: '4', title: 'Arrive', description: 'Visit the centre at your scheduled time' },
    { number: '5', title: 'Complete', description: 'Complete the procurement process' },
    { number: '6', title: 'Track Payment', description: 'Monitor your payment status' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-green-800">AgriQueue</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 gradient-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                🚀 AgriQueue
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Smart Procurement <br />for Farmers
              </h1>
              <p className="text-lg md:text-xl text-white/90 mt-4 max-w-lg">
                Book your procurement slot, track your queue, and receive real-time updates — all from one platform.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link to="/register">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Register as Farmer
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Book a Slot
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Track Status
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Today's Stats</p>
                      <p className="text-sm text-white/80">Live from procurement centres</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-xs text-white/80">Farmers Today</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-xs text-white/80">In Queue</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">18</p>
                      <p className="text-xs text-white/80">Completed</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-white/80">Processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-green-800">
                  {stat.value.toLocaleString()}{stat.suffix}
                </p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need for <span className="text-green-700">Smart Procurement</span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              A complete platform designed to simplify the procurement process for farmers
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl card-shadow card-shadow-hover border border-gray-100 transition-all duration-300 hover:border-green-200 group"
              >
                <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It <span className="text-green-700">Works</span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Get started in 6 simple steps
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-white p-6 rounded-xl card-shadow border border-gray-100 relative">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 gradient-green rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your <span className="text-yellow-300">Procurement Journey</span>?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of farmers who have already simplified their procurement process
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button variant="success" size="lg" className="!bg-white !text-green-800 hover:!bg-gray-100">
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Login to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-500" />
              <span className="font-bold text-white">AgriQueue</span>
            </div>
            <p className="text-sm text-center">
              © 2026 Smart Farmer Procurement System — Smart India Hackathon
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span>Made with ❤️ for Farmers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}