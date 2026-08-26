import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import StatusBadge from './StatusBadge'
import Button from './Button'

export default function QueueTracker({ 
  token, 
  currentToken, 
  peopleAhead, 
  estimatedWait,
  queueList = [],
  onRefresh,
  isRefreshing = false
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (queueList.length > 0) {
      const total = queueList.length
      const completed = queueList.filter(item => item.status === 'completed').length
      const processing = queueList.filter(item => item.status === 'processing').length
      const myIndex = queueList.findIndex(item => item.token === token)
      
      if (myIndex !== -1) {
        const progressValue = ((completed + processing) / total) * 100
        setProgress(Math.min(progressValue, 100))
      } else {
        setProgress(0)
      }
    }
  }, [queueList, token])

  return (
    <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800">Queue Status</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRefresh}
          disabled={isRefreshing}
          icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
        >
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Your Token</p>
          <p className="text-xl font-bold text-gray-900">{token}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Current Token</p>
          <p className="text-xl font-bold text-gray-900">{currentToken}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">People Ahead</p>
          <p className="text-xl font-bold text-gray-900">{peopleAhead}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Est. Wait Time</p>
          <p className="text-xl font-bold text-gray-900">{estimatedWait} min</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Queue Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="gradient-green h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Queue list */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-2 px-3 text-gray-600 font-medium">Token</th>
              <th className="text-left py-2 px-3 text-gray-600 font-medium">Farmer</th>
              <th className="text-left py-2 px-3 text-gray-600 font-medium">Time</th>
              <th className="text-left py-2 px-3 text-gray-600 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {queueList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No farmers in queue
                </td>
              </tr>
            ) : (
              queueList.map((item, index) => (
                <tr 
                  key={item.token} 
                  className={`border-b border-gray-50 ${
                    item.token === token ? 'bg-green-50' : ''
                  } ${
                    item.status === 'processing' ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="py-2 px-3 font-medium text-gray-900">{item.token}</td>
                  <td className="py-2 px-3 text-gray-700">{item.farmer}</td>
                  <td className="py-2 px-3 text-gray-500">{item.time || '-'}</td>
                  <td className="py-2 px-3">
                    <StatusBadge status={item.status} />
                    {item.token === token && (
                      <span className="ml-2 text-xs font-medium text-green-700">(You)</span>
                    )}
                    {item.status === 'processing' && (
                      <span className="ml-2 text-xs font-medium text-blue-700 animate-pulse">●</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}