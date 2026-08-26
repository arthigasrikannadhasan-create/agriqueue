import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function Layout({ children, user, logout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()

    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Navbar */}
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        user={user}
        logout={logout}
        isMobile={isMobile}
      />

      <div className="flex pt-16">

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          user={user}
          onCollapsedChange={setSidebarCollapsed}
        />

        {/* Main Content */}
        <main
          className={`
            flex-1
            min-w-0
            min-h-screen
            transition-all
            duration-300
            p-3 sm:p-4 md:p-6 lg:p-8
            pt-28 md:pt-32
            ${isMobile
              ? 'ml-0 pb-20'
              : sidebarCollapsed
                ? 'ml-20'
                : 'ml-64'
            }
          `}
        >
          <div className="w-full max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>

      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

    </div>
  )
}