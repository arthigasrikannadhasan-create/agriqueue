import StatusBadge from './StatusBadge'

export default function SlotCard({ 
  slot, 
  selected, 
  onSelect,
  className = ''
}) {
  const isAvailable = slot.available > 0
  const isFull = slot.full || slot.available === 0

  return (
    <button
      onClick={() => isAvailable && onSelect(slot)}
      disabled={!isAvailable}
      className={`
        w-full text-left p-4 rounded-lg border-2 transition-all duration-200
        ${selected 
          ? 'border-green-600 bg-green-50 shadow-sm' 
          : isAvailable 
            ? 'border-gray-200 hover:border-green-400 hover:bg-gray-50' 
            : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
        }
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">
            {slot.start} – {slot.end}
          </p>
          {isAvailable ? (
            <p className="text-sm text-gray-500 mt-0.5">
              {slot.available} slots available
            </p>
          ) : (
            <p className="text-sm text-red-500 mt-0.5">Fully booked</p>
          )}
        </div>
        <StatusBadge 
          status={isAvailable ? 'available' : 'full'} 
          label={isAvailable ? `${slot.available} left` : 'Full'}
        />
      </div>
    </button>
  )
}