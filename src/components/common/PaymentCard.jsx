import StatusBadge from './StatusBadge'
import { formatCurrency, formatDate } from '../../utils/helpers'

export default function PaymentCard({ payment, className = '' }) {
  return (
    <div className={`bg-white rounded-xl p-5 card-shadow border border-gray-100 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">{payment.centre}</h4>
          <p className="text-sm text-gray-500 mt-0.5">{payment.crop} • {payment.quantity} kg</p>
        </div>
        <StatusBadge status={payment.status} />
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Amount</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Date</p>
          <p className="text-sm text-gray-700">{formatDate(payment.date)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Rate</p>
          <p className="text-sm text-gray-700">{formatCurrency(payment.rate)}/kg</p>
        </div>
      </div>
    </div>
  )
}