import { forwardRef } from 'react'

const DashboardCard = forwardRef(({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'green',
  className = '',
  children,
  ...props
}, ref) => {
  const colors = {
    green: 'bg-green-50 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
    orange: 'bg-orange-50 text-orange-700',
    purple: 'bg-purple-50 text-purple-700',
    red: 'bg-red-50 text-red-700',
    gray: 'bg-gray-50 text-gray-700',
  }

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl p-5 card-shadow card-shadow-hover border border-gray-100 ${className}`}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${colors[color] || colors.green}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {children}
    </div>
  )
})

DashboardCard.displayName = 'DashboardCard'

export default DashboardCard