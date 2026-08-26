import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarPlus,
  Users,
  ClipboardList,
  CreditCard,
  Bell,
  MapPin,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Sidebar({
  isOpen,
  isMobile,
  user,
  onCollapsedChange
}) {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    {
      path: '/book-slot',
      icon: CalendarPlus,
      label: 'Book Slot'
    },
    {
      path: '/queue',
      icon: Users,
      label: 'My Queue'
    },
    {
      path: '/procurement',
      icon: ClipboardList,
      label: 'Procurement'
    },
    {
      path: '/payments',
      icon: CreditCard,
      label: 'Payments'
    },
    {
      path: '/notifications',
      icon: Bell,
      label: 'Notifications'
    },
    {
      path: '/centres',
      icon: MapPin,
      label: 'Centres'
    }
  ]

  const isAdmin = user?.role === 'admin'

  if (isAdmin) {
    navItems.push({
      path: '/admin',
      icon: Shield,
      label: 'Admin Panel'
    })
  }

  // Tell Layout when sidebar collapses
  useEffect(() => {
    if (!isMobile && onCollapsedChange) {
      onCollapsedChange(collapsed)
    }

    if (isMobile && onCollapsedChange) {
      onCollapsedChange(false)
    }
  }, [collapsed, isMobile, onCollapsedChange])

  const sidebarClasses = `
    fixed
    left-0
    top-16
    h-[calc(100vh-4rem)]
    bg-white
    border-r
    border-gray-200
    transition-all
    duration-300
    z-40
    ${isMobile ? 'transform' : ''}
    ${isMobile && !isOpen ? '-translate-x-full' : ''}
    ${isMobile && isOpen ? 'translate-x-0 shadow-xl' : ''}
    ${!isMobile && collapsed ? 'w-20' : 'w-64'}
  `

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" />
      )}

      <aside className={sidebarClasses}>

        <div className="flex flex-col h-full">

          {/* Desktop collapse button */}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="
                absolute
                -right-3
                top-6
                w-6
                h-6
                bg-white
                border
                border-gray-200
                rounded-full
                flex
                items-center
                justify-center
                hover:bg-gray-50
                transition-colors
                shadow-sm
                z-50
              "
              aria-label={
                collapsed
                  ? 'Expand sidebar'
                  : 'Collapse sidebar'
              }
            >
              {collapsed ? (
                <ChevronRight className="w-3 h-3 text-gray-500" />
              ) : (
                <ChevronLeft className="w-3 h-3 text-gray-500" />
              )}
            </button>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">

            <ul className="space-y-1">

              {navItems.map((item) => {
                const Icon = item.icon

                return (
                  <li key={item.path}>

                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex
                        items-center
                        gap-3
                        px-3
                        py-2.5
                        rounded-lg
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? 'bg-green-50 text-green-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }

                        ${
                          collapsed && !isMobile
                            ? 'justify-center'
                            : ''
                        }
                      `}
                      title={
                        collapsed && !isMobile
                          ? item.label
                          : ''
                      }
                    >

                      <Icon
                        className="w-5 h-5 flex-shrink-0"
                      />

                      {(!collapsed || isMobile) && (
                        <span className="text-sm truncate">
                          {item.label}
                        </span>
                      )}

                    </NavLink>

                  </li>
                )
              })}

            </ul>

          </nav>

          {/* User information */}
          <div
            className={`
              border-t
              border-gray-200
              p-4

              ${
                collapsed && !isMobile
                  ? 'text-center'
                  : ''
              }
            `}
          >

            <div
              className={`
                flex
                items-center
                gap-3

                ${
                  collapsed && !isMobile
                    ? 'justify-center'
                    : ''
                }
              `}
            >

              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  gradient-green
                  flex
                  items-center
                  justify-center
                  text-white
                  font-semibold
                  text-sm
                  flex-shrink-0
                "
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              {(!collapsed || isMobile) && (
                <div className="flex-1 min-w-0">

                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.name || 'User'}
                  </p>

                  <p className="text-xs text-gray-500 truncate">
                    {user?.role === 'admin'
                      ? 'Administrator'
                      : 'Farmer'}
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </aside>
    </>
  )
}