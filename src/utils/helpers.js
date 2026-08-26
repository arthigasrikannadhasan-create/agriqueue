export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatTime = (timeString) => {
  if (!timeString) return ''
  return timeString
}

export const getStatusColor = (status) => {
  const colors = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'processing': 'bg-blue-100 text-blue-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'waiting': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'failed': 'bg-red-100 text-red-800',
    'full': 'bg-red-100 text-red-800',
    'available': 'bg-green-100 text-green-800',
    'default': 'bg-gray-100 text-gray-800'
  }
  return colors[status] || colors.default
}

export const getStatusLabel = (status) => {
  const labels = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'processing': 'Processing',
    'pending': 'Pending',
    'waiting': 'Waiting',
    'confirmed': 'Confirmed',
    'cancelled': 'Cancelled',
    'failed': 'Failed',
    'full': 'Full',
    'available': 'Available',
    'default': status
  }
  return labels[status] || status
}

export const getInitials = (name) => {
  if (!name) return 'U'
  const parts = name.split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const isValidMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile)
}

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const isValidAadhaar = (aadhaar) => {
  return /^\d{12}$/.test(aadhaar)
}

export const getTimeSlotsForDate = (date, centreId) => {
  // In a real app, this would fetch from API
  // For demo, return all time slots with random availability
  const slots = []
  const times = ['08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM']
  times.forEach((time, index) => {
    const available = Math.floor(Math.random() * 10)
    slots.push({
      id: `TS${String(index + 1).padStart(2, '0')}`,
      start: time,
      end: time,
      available: available,
      capacity: 10,
      full: available === 0
    })
  })
  return slots
}