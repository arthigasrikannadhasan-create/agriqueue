export const centres = [
  {
    id: 'C001',
    name: 'Madurai Central Procurement Centre',
    location: 'Madurai, Tamil Nadu',
    address: '123 Agriculture Road, Madurai - 625001',
    district: 'Madurai',
    openingHours: '8:00 AM - 6:00 PM',
    currentQueue: 18,
    estimatedWait: 45,
    totalSlots: 50,
    availableSlots: 12,
    phone: '+91 98765 43210',
    latitude: 9.9252,
    longitude: 78.1198
  },
  {
    id: 'C002',
    name: 'Thirumangalam Procurement Centre',
    location: 'Thirumangalam, Tamil Nadu',
    address: '45 Main Street, Thirumangalam - 625706',
    district: 'Madurai',
    openingHours: '8:30 AM - 5:30 PM',
    currentQueue: 8,
    estimatedWait: 25,
    totalSlots: 35,
    availableSlots: 20,
    phone: '+91 98765 43211'
  },
  {
    id: 'C003',
    name: 'Melur Procurement Centre',
    location: 'Melur, Tamil Nadu',
    address: '78 Bazaar Road, Melur - 625106',
    district: 'Madurai',
    openingHours: '8:00 AM - 5:00 PM',
    currentQueue: 5,
    estimatedWait: 15,
    totalSlots: 25,
    availableSlots: 15,
    phone: '+91 98765 43212'
  },
  {
    id: 'C004',
    name: 'Usilampatti Procurement Centre',
    location: 'Usilampatti, Tamil Nadu',
    address: '112 Government Colony, Usilampatti - 625532',
    district: 'Madurai',
    openingHours: '9:00 AM - 6:00 PM',
    currentQueue: 12,
    estimatedWait: 35,
    totalSlots: 30,
    availableSlots: 8,
    phone: '+91 98765 43213'
  }
]

export const crops = [
  { id: 'CR01', name: 'Paddy', rate: 22.50, unit: 'kg' },
  { id: 'CR02', name: 'Wheat', rate: 24.00, unit: 'kg' },
  { id: 'CR03', name: 'Maize', rate: 18.75, unit: 'kg' },
  { id: 'CR04', name: 'Cotton', rate: 55.00, unit: 'kg' },
  { id: 'CR05', name: 'Groundnut', rate: 45.00, unit: 'kg' },
  { id: 'CR06', name: 'Sugarcane', rate: 3.50, unit: 'kg' },
  { id: 'CR07', name: 'Turmeric', rate: 85.00, unit: 'kg' },
  { id: 'CR08', name: 'Chilli', rate: 120.00, unit: 'kg' }
]

export const timeSlots = [
  { id: 'TS01', start: '08:00 AM', end: '08:30 AM', available: 8, capacity: 10 },
  { id: 'TS02', start: '08:30 AM', end: '09:00 AM', available: 4, capacity: 10 },
  { id: 'TS03', start: '09:00 AM', end: '09:30 AM', available: 0, capacity: 10, full: true },
  { id: 'TS04', start: '09:30 AM', end: '10:00 AM', available: 6, capacity: 10 },
  { id: 'TS05', start: '10:00 AM', end: '10:30 AM', available: 3, capacity: 10 },
  { id: 'TS06', start: '10:30 AM', end: '11:00 AM', available: 7, capacity: 10 },
  { id: 'TS07', start: '11:00 AM', end: '11:30 AM', available: 2, capacity: 10 },
  { id: 'TS08', start: '11:30 AM', end: '12:00 PM', available: 0, capacity: 10, full: true },
  { id: 'TS09', start: '01:00 PM', end: '01:30 PM', available: 5, capacity: 10 },
  { id: 'TS10', start: '01:30 PM', end: '02:00 PM', available: 8, capacity: 10 },
  { id: 'TS11', start: '02:00 PM', end: '02:30 PM', available: 3, capacity: 10 },
  { id: 'TS12', start: '02:30 PM', end: '03:00 PM', available: 6, capacity: 10 }
]

export const districts = [
  'Madurai',
  'Thirumangalam',
  'Melur',
  'Usilampatti',
  'Dindigul',
  'Theni',
  'Virudhunagar',
  'Sivaganga'
]

export const states = [
  'Tamil Nadu',
  'Kerala',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'Punjab',
  'Uttar Pradesh',
  'West Bengal',
  'Odisha'
]

export const getDemoNotifications = () => [
  {
    id: 'N001',
    title: 'Slot Confirmed',
    message: 'Your procurement slot is confirmed for 10:30 AM at Madurai Central Procurement Centre.',
    timestamp: '2026-08-27T08:00:00',
    read: false,
    type: 'slot'
  },
  {
    id: 'N002',
    title: 'Queue Update',
    message: 'Your current queue position is 12. Estimated wait time: 35 minutes.',
    timestamp: '2026-08-27T07:45:00',
    read: false,
    type: 'queue'
  },
  {
    id: 'N003',
    title: 'Weighing Started',
    message: 'Your weighing process has started at Madurai Central Procurement Centre.',
    timestamp: '2026-08-26T14:30:00',
    read: true,
    type: 'procurement'
  },
  {
    id: 'N004',
    title: 'Payment Processing',
    message: 'Payment of ₹18,750 is being processed for your paddy procurement.',
    timestamp: '2026-08-26T13:00:00',
    read: true,
    type: 'payment'
  }
]

export const getDemoQueue = () => [
  { token: 'MP-1010', farmer: 'Murali K.', status: 'completed', time: '08:00 AM' },
  { token: 'MP-1011', farmer: 'Senthil R.', status: 'completed', time: '08:30 AM' },
  { token: 'MP-1012', farmer: 'Kumar V.', status: 'processing', time: '09:00 AM' },
  { token: 'MP-1013', farmer: 'Rajesh P.', status: 'waiting', time: '09:30 AM' },
  { token: 'MP-1014', farmer: 'Selvi M.', status: 'waiting', time: '10:00 AM' },
  { token: 'MP-1015', farmer: 'Ganesh S.', status: 'waiting', time: '10:30 AM' },
  { token: 'MP-1016', farmer: 'Priya K.', status: 'waiting', time: '11:00 AM' }
]

export const getDemoPayments = () => [
  {
    id: 'P001',
    date: '2026-08-26',
    centre: 'Madurai Central Procurement Centre',
    crop: 'Paddy',
    quantity: 500,
    rate: 37.50,
    amount: 18750,
    status: 'pending'
  },
  {
    id: 'P002',
    date: '2026-08-20',
    centre: 'Thirumangalam Procurement Centre',
    crop: 'Wheat',
    quantity: 300,
    rate: 24.00,
    amount: 7200,
    status: 'completed'
  },
  {
    id: 'P003',
    date: '2026-08-15',
    centre: 'Melur Procurement Centre',
    crop: 'Maize',
    quantity: 200,
    rate: 18.75,
    amount: 3750,
    status: 'completed'
  }
]

export const getDemoProcurementStatus = () => ({
  registration: { status: 'completed', date: '2026-08-25T10:00:00' },
  slotBooking: { status: 'completed', date: '2026-08-25T10:30:00' },
  arrived: { status: 'completed', date: '2026-08-26T09:45:00' },
  qualityCheck: { status: 'completed', date: '2026-08-26T10:15:00' },
  weighing: { status: 'in-progress', date: '2026-08-26T11:00:00' },
  procurement: { status: 'pending', date: null },
  payment: { status: 'pending', date: null }
})

// Generate a unique token
export const generateToken = (centreId) => {
  const prefix = centreId.substring(1, 4).toUpperCase()
  const num = Math.floor(100 + Math.random() * 900)
  return `${prefix}-${num}`
}

// Generate booking data
export const generateBooking = (formData, centre, crop, slot) => {
  const token = generateToken(centre.id)
  const date = new Date()
  const bookingDate = new Date(formData.date)
  
  return {
    id: `B${Date.now()}`,
    token,
    farmerId: formData.farmerId || 'FMR1001',
    farmerName: formData.farmerName || 'Demo Farmer',
    centre: centre,
    crop: crop,
    quantity: formData.quantity,
    date: formData.date,
    timeSlot: slot,
    bookingDate: date.toISOString(),
    status: 'confirmed',
    queuePosition: Math.floor(Math.random() * 15) + 1,
    estimatedWait: Math.floor(Math.random() * 30) + 15
  }
}