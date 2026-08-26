import { useState, useEffect } from 'react'
import NotificationCard from '../components/common/NotificationCard'
import { getNotifications, setNotifications } from '../utils/storage'
import { Bell, CheckCheck } from 'lucide-react'
import Button from '../components/common/Button'

export default function Notifications({ user }) {
  const [notifications, setNotificationsState] = useState([])

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    const data = getNotifications()
    setNotificationsState(data)
  }

  const handleMarkRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
    setNotificationsState(updated)
    setNotifications(updated)
  }

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotificationsState(updated)
    setNotifications(updated)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleMarkAllRead}
            icon={<CheckCheck className="w-4 h-4" />}
          >
            Mark All Read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center card-shadow border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900">No notifications</h3>
            <p className="text-gray-500 text-sm mt-1">
              You'll see notifications here when they arrive
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
            />
          ))
        )}
      </div>
    </div>
  )
}