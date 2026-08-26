import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  User,
  Package,
  TrendingUp,
  RefreshCw
} from 'lucide-react'
import ProgressTimeline from '../components/common/ProgressTimeline'
import { getDemoProcurementStatus } from '../data/mockData'
import Button from '../components/common/Button'
import { formatDate, formatDateTime } from '../utils/helpers'

export default function Procurement({ user }) {
  const [steps, setSteps] = useState([])
  const [procurementData, setProcurementData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    loadProcurementData()
  }, [])

  const loadProcurementData = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const status = getDemoProcurementStatus()
      
      const stepData = [
        { 
          label: 'Registration', 
          status: status.registration.status, 
          date: status.registration.date,
          description: 'Farmer registered successfully'
        },
        { 
          label: 'Slot Booking', 
          status: status.slotBooking.status, 
          date: status.slotBooking.date,
          description: 'Slot confirmed'
        },
        { 
          label: 'Farmer Arrived', 
          status: status.arrived.status, 
          date: status.arrived.date,
          description: 'Arrived at procurement centre'
        },
        { 
          label: 'Quality Check', 
          status: status.qualityCheck.status, 
          date: status.qualityCheck.date,
          description: 'Quality inspection in progress'
        },
        { 
          label: 'Weighing', 
          status: status.weighing.status, 
          date: status.weighing.date,
          description: 'Crop weighing in progress'
        },
        { 
          label: 'Procurement', 
          status: status.procurement.status, 
          date: status.procurement.date,
          description: 'Procurement processing'
        },
        { 
          label: 'Payment', 
          status: status.payment.status, 
          date: status.payment.date,
          description: 'Payment processing'
        },
      ]
      
      setSteps(stepData)
      setProcurementData({
        centre: 'Madurai Central Procurement Centre',
        centreLocation: 'Madurai, Tamil Nadu',
        crop: 'Paddy',
        quantity: '500',
        rate: '₹37.50/kg',
        token: 'MP-1024',
        totalAmount: '₹18,750',
        estimatedCompletion: '2-3 business days'
      })
      setLastUpdated(new Date())
      setLoading(false)
      setRefreshing(false)
    }, 800)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    loadProcurementData()
  }

  const getProgressPercentage = () => {
    const completed = steps.filter(s => s.status === 'completed').length
    const total = steps.length
    return Math.round((completed / total) * 100)
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'in-progress':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading procurement status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-8 h-8 text-green-700" />
            Procurement Status
          </h1>
          <p className="text-gray-500 mt-1">Track your procurement process in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-gray-400">
              Last updated: {formatDateTime(lastUpdated)}
            </span>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Progress Overview Card */}
      <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">Overall Progress</h3>
            <p className="text-sm text-gray-500">
              {steps.filter(s => s.status === 'completed').length} of {steps.length} steps completed
            </p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex-1 sm:w-48">
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full gradient-green rounded-full transition-all duration-1000"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
            <span className="text-2xl font-bold text-green-700 min-w-[50px] text-right">
              {getProgressPercentage()}%
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
        <ProgressTimeline steps={steps} />
      </div>

      {/* Current Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-700" />
            Procurement Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Centre</span>
              <span className="font-medium text-gray-900">{procurementData?.centre}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Location</span>
              <span className="font-medium text-gray-900">{procurementData?.centreLocation}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Token</span>
              <span className="font-bold text-green-700">{procurementData?.token}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Status</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {getStatusIcon('in-progress')}
                In Progress
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-700" />
            Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Crop</span>
              <span className="font-medium text-gray-900">{procurementData?.crop}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Quantity</span>
              <span className="font-medium text-gray-900">{procurementData?.quantity} kg</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Rate</span>
              <span className="font-medium text-gray-900">{procurementData?.rate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Total Amount</span>
              <span className="font-bold text-green-700 text-lg">{procurementData?.totalAmount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Est. Completion</span>
              <span className="text-sm text-gray-600">{procurementData?.estimatedCompletion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-800">Procurement Status</h4>
          <p className="text-sm text-blue-700 mt-0.5">
            Your procurement is currently in progress. You will be notified when each step is completed.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-blue-600">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Step completed
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> In progress
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}