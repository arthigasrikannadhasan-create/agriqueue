import { MapPin, Clock, Users, Calendar, Phone } from 'lucide-react'
import Button from './Button'

export default function CentreCard({ centre, onBookSlot, className = '' }) {
  return (
    <div className={`bg-white rounded-xl p-5 card-shadow card-shadow-hover border border-gray-100 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{centre.name}</h4>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{centre.location}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{centre.phone || 'Not available'}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap ml-2">
          <Clock className="w-3.5 h-3.5" />
          <span>{centre.openingHours || '8:00 AM - 6:00 PM'}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Queue</p>
          <p className="text-lg font-bold text-gray-900">{centre.currentQueue || 0}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Wait Time</p>
          <p className="text-lg font-bold text-gray-900">{centre.estimatedWait || 0} min</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Slots</p>
          <p className="text-lg font-bold text-gray-900">{centre.availableSlots || 0}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <Button 
          variant="primary" 
          size="sm" 
          className="w-full"
          onClick={() => onBookSlot(centre)}
        >
          <Calendar className="w-4 h-4" />
          Book Slot
        </Button>
      </div>
    </div>
  )
}