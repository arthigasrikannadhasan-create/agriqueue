import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarPlus,
  Users,
  ClipboardList,
  CreditCard,
  Bell,
  MapPin
} from 'lucide-react'

export default function MobileNav() {
  const location = useLocation()
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { path: '/book-slot', icon: CalendarPlus, label: 'Book' },
    { path: '/queue', icon: Users, label: 'Queue' },
    { path: '/payments', icon: CreditCard, label: 'Payments' },
    { path: '/notifications', icon: Bell, label: 'Alerts' },
  ]

  // Only show on mobile
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-0.5 px-2 py-1 transition-colors
                ${isActive ? 'text-green-700' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'fill-green-50' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}