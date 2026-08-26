import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export default function Toast({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 4000 
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertCircle className="w-5 h-5 text-orange-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  }

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-orange-50 border-orange-200',
    info: 'bg-blue-50 border-blue-200',
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[type]} shadow-lg animate-slide-up max-w-sm`}>
      {icons[type]}
      <p className="text-sm text-gray-800 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-0.5 hover:bg-gray-200/50 rounded transition-colors"
        aria-label="Close toast"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  )
}