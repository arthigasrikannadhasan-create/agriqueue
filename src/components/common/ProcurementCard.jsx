import { MapPin, Calendar, Clock, User } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { formatDate } from '../../utils/helpers'

export default function ProcurementCard({ procurement, className = '' }) {
  return (
    <div className={`bg-white rounded-xl p-5 card-shadow border border-gray-100 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{procurement.centre?.name || procurement.centre}</h4>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{procurement.centre?.location || 'Location not specified'}</span>
          </div>
        </div>
        <StatusBadge status={procurement.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className="text-xs text-gray-500">Crop</p>
          <p className="text-sm font-medium text-gray-900">{procurement.crop}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Quantity</p>
          <p className="text-sm font-medium text-gray-900">{procurement.quantity} kg</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Date</p>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <p className="text-sm font-medium text-gray-900">{formatDate(procurement.date)}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Token</p>
          <p className="text-sm font-medium text-gray-900">{procurement.token}</p>
        </div>
      </div>
    </div>
  )
}