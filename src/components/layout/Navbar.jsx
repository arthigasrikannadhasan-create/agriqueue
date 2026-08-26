import { Link } from 'react-router-dom'
import { 
  Menu, 
  Bell, 
  User, 
  LogOut,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { getInitials } from '../../utils/helpers'
import { getNotifications } from '../../utils/storage'

export default function Navbar({ onMenuClick, user, logout, isMobile }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const profileRef = useRef(null)
  const notificationRef = useRef(null)
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    setNotifications(getNotifications())
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 card-shadow h-16">
      <div className="px-3 sm:px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onMenuClick}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 gradient-green rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-green-800 hidden sm:block">AgriQueue</span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 max-h-96 overflow-y-auto z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h4 className="font-semibold text-gray-800">Notifications</h4>
                </div>
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    No notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? 'bg-green-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-green-600' : 'bg-gray-300'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">{n.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(n.timestamp).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <Link to="/notifications" className="block px-4 py-2 text-center text-sm text-green-700 hover:bg-green-50 transition-colors border-t border-gray-100">
                  View All Notifications
                </Link>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1 sm:gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full gradient-green flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                {user ? getInitials(user.name) : 'U'}
              </div>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium text-gray-800 truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.mobile || user?.email || ''}</p>
                </div>
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link to="/notifications" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  <Bell className="w-4 h-4" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-sm text-red-600 border-t border-gray-100 mt-1 pt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}