import { getStatusColor, getStatusLabel } from '../../utils/helpers'

export default function StatusBadge({ status, label, className = '' }) {
  const colorClass = getStatusColor(status)
  const displayLabel = label || getStatusLabel(status)

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60" />
      {displayLabel}
    </span>
  )
}