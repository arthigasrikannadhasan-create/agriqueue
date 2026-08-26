import { Check, Loader2, Clock } from 'lucide-react'

export default function ProgressTimeline({ steps }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />
      case 'in-progress':
        return <Loader2 className="w-4 h-4 animate-spin" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 text-white'
      case 'in-progress':
        return 'bg-blue-600 text-white'
      default:
        return 'bg-gray-300 text-gray-500'
    }
  }

  const getLineColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600'
      case 'in-progress':
        return 'bg-blue-600'
      default:
        return 'bg-gray-300'
    }
  }

  const activeIndex = steps.findIndex(s => s.status === 'in-progress')
  const completedCount = steps.filter(s => s.status === 'completed').length

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="hidden sm:block absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
        <div 
          className="bg-green-600 transition-all duration-500"
          style={{ 
            height: `${(completedCount / steps.length) * 100}%`,
            maxHeight: '100%'
          }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-6 relative">
        {steps.map((step, index) => {
          const isActive = step.status === 'in-progress'
          const isCompleted = step.status === 'completed'
          const isPending = step.status === 'pending'

          return (
            <div key={index} className="flex items-start gap-4 relative">
              {/* Timeline dot */}
              <div className={`
                flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300
                ${getStatusColor(step.status)}
                ${isActive ? 'ring-4 ring-blue-200' : ''}
                ${isCompleted ? 'shadow-sm' : ''}
              `}>
                {getStatusIcon(step.status)}
              </div>

              {/* Content */}
              <div className={`flex-1 pt-1 ${
                isPending ? 'opacity-60' : ''
              }`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className={`font-medium ${
                    isCompleted ? 'text-gray-900' : 
                    isActive ? 'text-blue-700' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </h4>
                  {isActive && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      In Progress
                    </span>
                  )}
                  {isCompleted && step.date && (
                    <span className="text-xs text-gray-400">
                      {new Date(step.date).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                </div>
                {step.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
                )}
              </div>

              {/* Status label for mobile */}
              <div className="sm:hidden flex-shrink-0">
                <span className={`text-xs font-medium ${
                  isCompleted ? 'text-green-600' : 
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {isCompleted ? 'Done' : 
                   isActive ? 'Now' : 'Pending'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}