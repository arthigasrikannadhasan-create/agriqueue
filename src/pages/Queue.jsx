import { useState, useEffect } from 'react'
import QueueTracker from '../components/common/QueueTracker'
import { getBookings } from '../utils/storage'
import { getDemoQueue } from '../data/mockData'

export default function Queue({ user }) {
  const [queueData, setQueueData] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [bookings, setBookings] = useState([])
  const [latestBooking, setLatestBooking] = useState(null)

  useEffect(() => {
    const allBookings = getBookings()
    setBookings(allBookings)
    if (allBookings.length > 0) {
      setLatestBooking(allBookings[allBookings.length - 1])
    }
    loadQueue()
  }, [])

  const loadQueue = () => {
    const demoQueue = getDemoQueue()
    setQueueData(demoQueue)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const demoQueue = getDemoQueue().map((item, index) => {
        if (index < 2) return { ...item, status: 'completed' }
        if (index === 2) return { ...item, status: 'processing' }
        return { ...item, status: 'waiting' }
      })
      setQueueData(demoQueue)
      setIsRefreshing(false)
    }, 1500)
  }

  const token = latestBooking?.token || 'MP-1024'
  const currentToken = queueData.find(item => item.status === 'processing')?.token || 'MP-1012'
  const peopleAhead = queueData.filter(item => item.status === 'waiting').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Queue</h1>
        <p className="text-gray-500">Track your real-time queue position</p>
      </div>

      <QueueTracker
        token={token}
        currentToken={currentToken}
        peopleAhead={peopleAhead}
        estimatedWait={Math.max(5, peopleAhead * 3)}
        queueList={queueData}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {!latestBooking && (
        <div className="bg-white rounded-xl p-8 text-center card-shadow border border-gray-100">
          <p className="text-gray-500">You don't have any active bookings</p>
          <button
            onClick={() => window.location.href = '/book-slot'}
            className="mt-3 text-green-700 font-medium hover:text-green-800"
          >
            Book a Slot →
          </button>
        </div>
      )}
    </div>
  )
}