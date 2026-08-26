import { useState, useEffect } from 'react'
import PaymentCard from '../components/common/PaymentCard'
import { getDemoPayments } from '../data/mockData'
import { formatCurrency } from '../utils/helpers'

export default function Payments({ user }) {
  const [payments, setPayments] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    const data = getDemoPayments()
    setPayments(data)
    const total = data.reduce((sum, p) => sum + p.amount, 0)
    setTotalAmount(total)
  }, [])

  const pendingPayments = payments.filter(p => p.status === 'pending')
  const completedPayments = payments.filter(p => p.status === 'completed')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500">Track your payment status and history</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 card-shadow border border-gray-100">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 card-shadow border border-gray-100">
          <p className="text-sm text-gray-500">Pending Payments</p>
          <p className="text-2xl font-bold text-orange-600">{pendingPayments.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 card-shadow border border-gray-100">
          <p className="text-sm text-gray-500">Completed Payments</p>
          <p className="text-2xl font-bold text-green-600">{completedPayments.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Payment History</h3>
        {payments.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center card-shadow border border-gray-100">
            <p className="text-gray-500">No payment records found</p>
          </div>
        ) : (
          payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        )}
      </div>
    </div>
  )
}