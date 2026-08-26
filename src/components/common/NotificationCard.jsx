import { Bell, Calendar, Users, CreditCard, ClipboardList } from 'lucide-react'

export default function NotificationCard({ notification, onMarkRead }) {
  const getIcon = (type) => {
    switch (type) {
      case 'slot': return Calendar
      case 'queue': return Users
      case 'procurement': return ClipboardList
      case 'payment': return CreditCard
      default: return Bell
    }
  }

  const Icon = getIcon(notification.type)

  return (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 ${
        notification.read 
          ? 'bg-white border-gray-200' 
          : 'bg-green-50 border-green-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          notification.read ? 'bg-gray-100 text-gray-600' : 'bg-green-200 text-green-800'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
              {notification.title}
            </h4>
            {!notification.read && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs text-green-700 hover:text-green-800 font-medium whitespace-nowrap"
              >
                Mark read
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(notification.timestamp).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}