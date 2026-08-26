import { useState, useEffect } from 'react'
import { 
  Users, 
  Calendar, 
  Clock, 
  Building2, 
  ClipboardList, 
  CreditCard,
  RefreshCw,
  ChevronDown,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import DashboardCard from '../components/common/DashboardCard'
import StatusBadge from '../components/common/StatusBadge'
import Button from '../components/common/Button'
import SimpleChart from '../components/charts/SimpleChart'
import { centres, getDemoQueue } from '../data/mockData'

export default function Admin({ user }) {
  const [queueData, setQueueData] = useState([])
  const [stats, setStats] = useState({
    totalFarmers: 0,
    todayAppointments: 0,
    waitingFarmers: 0,
    activeCentres: 0,
    completedProcurements: 0,
    pendingPayments: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const queue = getDemoQueue()
    setQueueData(queue)

    setStats({
      totalFarmers: 1248,
      todayAppointments: 156,
      waitingFarmers: queue.filter(q => q.status === 'waiting').length,
      activeCentres: centres.length,
      completedProcurements: 89,
      pendingPayments: 23
    })
  }

  const handleRefresh = () => {
    loadData()
  }

  const chartData = {
    daily: [
      { label: 'Mon', value: 45 },
      { label: 'Tue', value: 52 },
      { label: 'Wed', value: 38 },
      { label: 'Thu', value: 65 },
      { label: 'Fri', value: 48 },
      { label: 'Sat', value: 30 },
      { label: 'Sun', value: 22 }
    ],
    queue: [
      { label: '8AM', value: 12 },
      { label: '9AM', value: 18 },
      { label: '10AM', value: 22 },
      { label: '11AM', value: 15 },
      { label: '12PM', value: 8 },
      { label: '1PM', value: 6 },
      { label: '2PM', value: 4 }
    ],
    slots: [
      { label: 'Mon', value: 78 },
      { label: 'Tue', value: 85 },
      { label: 'Wed', value: 72 },
      { label: 'Thu', value: 90 },
      { label: 'Fri', value: 68 },
      { label: 'Sat', value: 45 }
    ],
    payments: [
      { label: 'Pending', value: 23 },
      { label: 'Processing', value: 18 },
      { label: 'Completed', value: 48 }
    ]
  }

  const adminStats = [
    { title: 'Total Farmers', value: stats.totalFarmers, subtitle: 'Registered farmers', icon: Users, color: 'green' },
    { title: "Today's Appointments", value: stats.todayAppointments, subtitle: 'Scheduled today', icon: Calendar, color: 'blue' },
    { title: 'Farmers Waiting', value: stats.waitingFarmers, subtitle: 'In queue', icon: Clock, color: 'orange' },
    { title: 'Active Centres', value: stats.activeCentres, subtitle: 'Operational centres', icon: Building2, color: 'purple' },
    { title: 'Completed Procurements', value: stats.completedProcurements, subtitle: 'This week', icon: ClipboardList, color: 'green' },
    { title: 'Pending Payments', value: stats.pendingPayments, subtitle: 'Awaiting processing', icon: CreditCard, color: 'red' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage procurement centres and monitor operations</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Refresh Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {adminStats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Daily Procurement Volume</h3>
          <SimpleChart data={chartData.daily} type="bar" height={180} />
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Queue Length (Today)</h3>
          <SimpleChart data={chartData.queue} type="line" height={180} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Slot Utilization</h3>
          <SimpleChart data={chartData.slots} type="bar" height={180} />
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Status</h3>
          <SimpleChart data={chartData.payments} type="bar" height={180} />
        </div>
      </div>

      {/* Queue Management */}
      <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Queue Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Token</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Farmer</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Time</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queueData.map((item) => (
                <tr key={item.token} className="border-b border-gray-50">
                  <td className="py-2 px-4 font-medium text-gray-900">{item.token}</td>
                  <td className="py-2 px-4 text-gray-700">{item.farmer}</td>
                  <td className="py-2 px-4 text-gray-500">{item.time}</td>
                  <td className="py-2 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      {item.status === 'waiting' && (
                        <button className="text-green-600 hover:text-green-800 transition" title="Mark Processing">
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                      {item.status === 'processing' && (
                        <button className="text-green-600 hover:text-green-800 transition" title="Mark Complete">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 transition" title="View Details">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}