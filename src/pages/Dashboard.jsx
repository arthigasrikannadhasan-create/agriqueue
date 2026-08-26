import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Clock,
  Calendar,
  ClipboardList,
  CreditCard,
  MapPin,
  ArrowRight,
  CheckCircle,
  Loader2,
  Bell,
  RefreshCw,
  TrendingUp,
  Award,
  Truck,
  Package,
  DollarSign,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  Target,
  BarChart3,
  Activity
} from 'lucide-react'
import DashboardCard from '../components/common/DashboardCard'
import StatusBadge from '../components/common/StatusBadge'
import Button from '../components/common/Button'
import { getBookings, getNotifications } from '../utils/storage'
import { formatDate, formatCurrency } from '../utils/helpers'

export default function Dashboard({ user }) {
  const [bookings, setBookings] = useState([])
  const [notifications, setNotifications] = useState([])
  const [latestBooking, setLatestBooking] = useState(null)
  const [queuePosition, setQueuePosition] = useState(12)
  const [estimatedWait, setEstimatedWait] = useState(35)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [showWelcome, setShowWelcome] = useState(true)
  const [greeting, setGreeting] = useState('Good Morning')

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning 🌅')
    else if (hour < 17) setGreeting('Good Afternoon ☀️')
    else if (hour < 20) setGreeting('Good Evening 🌆')
    else setGreeting('Good Night 🌙')
    
    loadDashboardData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refreshData()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = () => {
    const allBookings = getBookings()
    setBookings(allBookings)
    if (allBookings.length > 0) {
      setLatestBooking(allBookings[allBookings.length - 1])
    }
    setNotifications(getNotifications())
    
    // Simulate real-time queue updates
    const randomPosition = Math.floor(Math.random() * 15) + 5
    setQueuePosition(randomPosition)
    setEstimatedWait(randomPosition * 3 + 5)
  }

  const refreshData = () => {
    setRefreshing(true)
    setTimeout(() => {
      loadDashboardData()
      setLastUpdated(new Date())
      setRefreshing(false)
    }, 1000)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Get stats for display
  const completedProcurements = bookings.filter(b => b.status === 'completed').length
  const pendingPayments = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length
  const totalBookings = bookings.length
  const activeProcurements = bookings.filter(b => b.status === 'confirmed' || b.status === 'in-progress').length

  // Calculate estimated completion time
  const getEstimatedCompletion = () => {
    if (!latestBooking) return 'Not available'
    const date = new Date(latestBooking.date)
    date.setDate(date.getDate() + 2)
    return formatDate(date)
  }

  const stats = [
    { 
      title: 'Queue Position', 
      value: `#${queuePosition}`, 
      subtitle: `${estimatedWait} min wait time`,
      icon: Users,
      color: 'orange',
      trend: queuePosition < 10 ? 'down' : 'up',
      trendValue: queuePosition < 10 ? 'Great' : 'Moderate',
      size: 'lg'
    },
    { 
      title: 'Next Slot', 
      value: latestBooking ? formatDate(latestBooking.date) : 'Not booked',
      subtitle: latestBooking ? `${latestBooking.timeSlot?.start || '10:30 AM'}` : 'Book your first slot',
      icon: Calendar,
      color: 'green',
      size: 'lg'
    },
    { 
      title: 'Procurement Status', 
      value: latestBooking ? 'Active' : 'No active',
      subtitle: latestBooking ? `Token: ${latestBooking.token}` : 'Start by booking a slot',
      icon: ClipboardList,
      color: 'blue',
      size: 'lg'
    },
    { 
      title: 'Payment Status', 
      value: pendingPayments > 0 ? `${pendingPayments} Pending` : 'All Clear',
      subtitle: pendingPayments > 0 ? `${pendingPayments} payment${pendingPayments > 1 ? 's' : ''} pending` : 'No pending payments',
      icon: CreditCard,
      color: pendingPayments > 0 ? 'purple' : 'green',
      size: 'lg'
    },
  ]

  // Quick actions - adjusted for better sizing
  const quickActions = [
    { icon: Calendar, label: 'Book Slot', path: '/book-slot', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { icon: Users, label: 'View Queue', path: '/queue', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { icon: ClipboardList, label: 'Procurement', path: '/procurement', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    { icon: CreditCard, label: 'Payments', path: '/payments', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
    { icon: MapPin, label: 'Centres', path: '/centres', color: 'bg-teal-100 text-teal-700 hover:bg-teal-200' },
    { icon: Bell, label: 'Alerts', path: '/notifications', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
  ]

  // Recent activity
  const recentActivities = bookings.slice(-4).reverse().map(b => ({
    id: b.id,
    action: b.status === 'confirmed' ? 'Slot Booked' : b.status === 'completed' ? 'Procurement Completed' : 'In Progress',
    detail: `${b.crop?.name || 'Crop'} - ${b.quantity || 0}kg`,
    time: b.bookingDate || new Date().toISOString(),
    status: b.status,
    token: b.token
  }))

  // Achievement badges
  const achievements = [
    { icon: Award, label: 'First Booking', achieved: totalBookings >= 1, color: 'text-yellow-600' },
    { icon: Target, label: '5 Bookings', achieved: totalBookings >= 5, color: 'text-blue-600' },
    { icon: Sparkles, label: 'Regular Farmer', achieved: totalBookings >= 10, color: 'text-purple-600' },
    { icon: Shield, label: 'Verified', achieved: true, color: 'text-green-600' },
  ]

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Welcome Section - Adjusted sizing */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 transition-all duration-500 ${showWelcome ? 'opacity-100' : 'opacity-0'}`}>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              {greeting}, {user?.name?.split(' ')[0] || 'Farmer'}! 👋
            </h1>
            {user?.role === 'admin' && (
              <span className="text-[10px] md:text-xs bg-purple-100 text-purple-700 px-2 py-0.5 md:px-3 md:py-1 rounded-full font-medium">
                Admin
              </span>
            )}
            {totalBookings >= 5 && (
              <span className="text-[10px] md:text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 md:px-3 md:py-1 rounded-full font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Regular
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1 flex flex-wrap items-center gap-1 md:gap-2">
            <span>Here's your procurement overview</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            disabled={refreshing}
            icon={<RefreshCw className={`w-3.5 h-3.5 md:w-4 md:h-4 ${refreshing ? 'animate-spin' : ''}`} />}
            className="text-xs md:text-sm"
          >
            {refreshing ? '...' : 'Refresh'}
          </Button>
          <Link to="/notifications">
            <Button variant="ghost" size="sm" className="relative p-1.5 md:p-2">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-orange-500 text-white text-[8px] md:text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/book-slot">
            <Button variant="primary" size="sm" className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Book Slot</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid - Adjusted sizing */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            color={stat.color}
            className="p-3 md:p-4 lg:p-5 hover:shadow-md transition-shadow"
          >
            {stat.trend && (
              <div className={`mt-1 md:mt-2 text-[10px] md:text-xs font-medium flex items-center gap-1 ${
                stat.trend === 'down' ? 'text-green-600' : 'text-orange-500'
              }`}>
                {stat.trend === 'down' ? '↓' : '↑'} {stat.trendValue}
              </div>
            )}
          </DashboardCard>
        ))}
      </div>

      {/* Quick Stats Summary - Adjusted sizing */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
        <div className="bg-white rounded-lg p-2 md:p-3 lg:p-4 border border-gray-100 text-center shadow-sm">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{totalBookings}</p>
          <p className="text-[10px] md:text-xs text-gray-500">Total Bookings</p>
        </div>
        <div className="bg-white rounded-lg p-2 md:p-3 lg:p-4 border border-gray-100 text-center shadow-sm">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">{completedProcurements}</p>
          <p className="text-[10px] md:text-xs text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-lg p-2 md:p-3 lg:p-4 border border-gray-100 text-center shadow-sm">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-orange-500">{pendingPayments}</p>
          <p className="text-[10px] md:text-xs text-gray-500">Pending Payments</p>
        </div>
        <div className="bg-white rounded-lg p-2 md:p-3 lg:p-4 border border-gray-100 text-center shadow-sm">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600">{activeProcurements}</p>
          <p className="text-[10px] md:text-xs text-gray-500">Active</p>
        </div>
      </div>

      {/* Two Column Layout for middle section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Quick Actions - Column 1 */}
        <div className="lg:col-span-1 bg-white rounded-xl p-4 md:p-5 lg:p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className={`p-2 md:p-3 rounded-lg ${action.color} transition-all hover:shadow-md hover:scale-105 text-center`}
              >
                <action.icon className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-0.5 md:mb-1" />
                <span className="text-[10px] md:text-xs font-medium block">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Appointment - Column 2 */}
        <div className="lg:col-span-2">
          {latestBooking ? (
            <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 card-shadow border border-gray-100 hover:shadow-md transition-shadow h-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-700" />
                    Today's Appointment
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-1 md:mt-2">
                    <div className="flex items-center gap-1 md:gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span className="text-xs md:text-sm text-gray-700">{latestBooking.centre?.name?.split(' ').slice(0, 3).join(' ') || 'Centre'}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span className="text-xs md:text-sm text-gray-700">{formatDate(latestBooking.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span className="text-xs md:text-sm text-gray-700">{latestBooking.timeSlot?.start || '10:30 AM'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] md:text-xs text-gray-500">Token</p>
                    <p className="font-bold text-base md:text-lg text-green-700">{latestBooking.token}</p>
                  </div>
                  <StatusBadge status="confirmed" className="text-[10px] md:text-xs" />
                </div>
              </div>
              {latestBooking.crop && (
                <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100 flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs text-gray-500">
                  <span>Crop: <span className="font-medium text-gray-700">{latestBooking.crop.name}</span></span>
                  <span>Quantity: <span className="font-medium text-gray-700">{latestBooking.quantity} kg</span></span>
                  <span>Est. Completion: <span className="font-medium text-gray-700">{getEstimatedCompletion()}</span></span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 md:p-8 text-center border border-green-200 h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">Ready to Start?</h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-xs">
                Book your first procurement slot today
              </p>
              <Link to="/book-slot" className="mt-3 md:mt-4">
                <Button variant="primary" size="sm" className="text-xs md:text-sm">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Book Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Queue Progress */}
      <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 card-shadow border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-green-700" />
            Queue Progress
          </h3>
          <Link to="/queue" className="text-xs md:text-sm text-green-700 hover:text-green-800 font-medium flex items-center gap-1">
            <span className="hidden xs:inline">View full queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <div className="flex-1 w-full">
            <div className="relative h-2.5 md:h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full gradient-green rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((queuePosition / 30) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] md:text-xs text-gray-500 mt-1">
              <span>Start</span>
              <span className="font-medium text-green-700">You (#{queuePosition})</span>
              <span>End</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-2 md:px-3 py-1 md:py-1.5 rounded-lg whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
            <span className="text-[10px] md:text-xs text-gray-500">Wait:</span>
            <span className="font-semibold text-green-700 text-xs md:text-sm">{estimatedWait} min</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1 mt-2 md:mt-3 text-[10px] md:text-xs text-gray-500">
          <span className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 bg-green-50 rounded-full">
            <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600" /> Completed
          </span>
          <span className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 bg-blue-50 rounded-full">
            <Loader2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600 animate-spin" /> Processing
          </span>
          <span className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 bg-yellow-50 rounded-full">
            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-600" /> Waiting
          </span>
        </div>
      </div>

      {/* Bottom Section - Achievements & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Achievements */}
        <div className="lg:col-span-1 bg-white rounded-xl p-4 md:p-5 lg:p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-3 md:mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            Achievements
          </h3>
          <div className="space-y-2 md:space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 md:gap-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                  achievement.achieved ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <achievement.icon className={`w-4 h-4 md:w-5 md:h-5 ${
                    achievement.achieved ? achievement.color : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className={`text-xs md:text-sm font-medium ${
                    achievement.achieved ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {achievement.label}
                  </p>
                  <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full mt-0.5 md:mt-1">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        achievement.achieved ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                      style={{ width: achievement.achieved ? '100%' : '0%' }}
                    />
                  </div>
                </div>
                <span className={`text-[10px] md:text-xs font-medium ${
                  achievement.achieved ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {achievement.achieved ? '✓' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-5 lg:p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-3 md:mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-green-700" />
            Recent Activity
          </h3>
          {recentActivities.length > 0 ? (
            <div className="space-y-2 md:space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-1.5 md:py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'confirmed' ? 'bg-green-100' : 
                      activity.status === 'completed' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {activity.status === 'confirmed' ? (
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                      ) : activity.status === 'completed' ? (
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                      ) : (
                        <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-yellow-600 animate-spin" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-[10px] md:text-xs text-gray-500 truncate">
                        {activity.detail} • Token: {activity.token}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-[10px] md:text-xs text-gray-400">
                      {new Date(activity.time).toLocaleDateString()}
                    </p>
                    <StatusBadge 
                      status={activity.status} 
                      className="text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5" 
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 md:py-6">
              <p className="text-xs md:text-sm text-gray-500">No recent activity</p>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1">Start by booking your first slot</p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3">
        <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-800 text-xs md:text-sm">💡 Smart Tips</h4>
          <p className="text-[10px] md:text-sm text-blue-700">
            {!latestBooking ? (
              'Book your procurement slot at least 24 hours in advance for the best time slots. Check available slots at nearby centres.'
            ) : (
              `Your next procurement is scheduled for ${formatDate(latestBooking.date)} at ${latestBooking.timeSlot?.start || '10:30 AM'}. Arrive 15 minutes early.`
            )}
          </p>
        </div>
      </div>
    </div>
  )
}