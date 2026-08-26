import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Sprout,
  Scale,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Building2
} from 'lucide-react'
import Button from '../components/common/Button'
import SlotCard from '../components/common/SlotCard'
import { centres, crops, timeSlots, generateBooking } from '../data/mockData'
import { addBooking, addNotification } from '../utils/storage'
import { formatDate } from '../utils/helpers'

export default function BookSlot({ user }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    district: '',
    centre: '',
    crop: '',
    quantity: '',
    date: '',
    timeSlot: '',
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  // Filter centres by district
  const filteredCentres = formData.district 
    ? centres.filter(c => c.district === formData.district)
    : centres

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === 1 && formData.district) {
      setStep(2)
    } else if (step === 2 && formData.centre) {
      setStep(3)
    } else if (step === 3 && formData.crop) {
      setStep(4)
    } else if (step === 4 && formData.quantity) {
      setStep(5)
    } else if (step === 5 && formData.date) {
      // Generate time slots for selected date
      const slots = timeSlots.map(s => ({
        ...s,
        available: Math.floor(Math.random() * 10),
        full: Math.random() > 0.6
      }))
      setAvailableSlots(slots)
      setStep(6)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleBookSlot = async () => {
    if (!formData.timeSlot) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const centre = centres.find(c => c.id === formData.centre)
    const crop = crops.find(c => c.id === formData.crop)
    const slot = formData.timeSlot

    const booking = generateBooking(
      { ...formData, farmerName: user?.name, farmerId: user?.farmerId },
      centre,
      crop,
      slot
    )

    addBooking(booking)

    // Add notification
    addNotification({
      title: 'Slot Booked Successfully',
      message: `Your procurement slot is confirmed for ${slot.start} at ${centre.name}. Token: ${booking.token}`,
      timestamp: new Date().toISOString(),
      type: 'slot'
    })

    setBookingDetails(booking)
    setBookingComplete(true)
    setLoading(false)
  }

  if (bookingComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 card-shadow border border-green-200 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Slot Booked Successfully!</h2>
          <p className="text-gray-500 mt-1">Your procurement slot has been confirmed</p>

          <div className="grid grid-cols-2 gap-4 mt-6 text-left bg-gray-50 rounded-xl p-5">
            <div>
              <p className="text-xs text-gray-500">Token</p>
              <p className="font-bold text-lg text-green-700">{bookingDetails.token}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium text-gray-900">{formatDate(bookingDetails.date)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-medium text-gray-900">{bookingDetails.timeSlot.start}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Centre</p>
              <p className="font-medium text-gray-900 text-sm">{bookingDetails.centre.name}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              variant="primary" 
              size="lg" 
              className="flex-1"
              onClick={() => navigate('/queue')}
            >
              View My Queue
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Book a Slot</h1>
        <p className="text-gray-500">Step {step} of 6</p>
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition ${
                s <= step ? 'bg-green-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 card-shadow border border-gray-100">
        {/* Step 1: Select District */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-semibold">Select District</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Madurai', 'Thirumangalam', 'Melur', 'Usilampatti', 'Dindigul', 'Theni'].map((district) => (
                <button
                  key={district}
                  onClick={() => handleChange('district', district)}
                  className={`p-4 rounded-lg border-2 text-center transition ${
                    formData.district === district
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-400'
                  }`}
                >
                  <p className="font-medium text-gray-900">{district}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Centre */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-semibold">Select Procurement Centre</h2>
            </div>
            <div className="space-y-3">
              {filteredCentres.map((centre) => (
                <button
                  key={centre.id}
                  onClick={() => handleChange('centre', centre.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    formData.centre === centre.id
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-400'
                  }`}
                >
                  <p className="font-medium text-gray-900">{centre.name}</p>
                  <p className="text-sm text-gray-500">{centre.location}</p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>Queue: {centre.currentQueue}</span>
                    <span>Wait: {centre.estimatedWait} min</span>
                    <span>Slots: {centre.availableSlots}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Crop */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-semibold">Select Crop</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {crops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => handleChange('crop', crop.id)}
                  className={`p-4 rounded-lg border-2 text-center transition ${
                    formData.crop === crop.id
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-400'
                  }`}
                >
                  <p className="font-medium text-gray-900">{crop.name}</p>
                  <p className="text-sm text-gray-500">₹{crop.rate}/kg</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Enter Quantity */}
        {step === 4 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-semibold">Enter Quantity</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (kg)
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                placeholder="e.g., 500"
                min="1"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition border-gray-300"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the estimated quantity of your crop
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Select Date */}
        {step === 5 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-semibold">Select Date</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Procurement Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition border-gray-300"
              />
            </div>
          </div>
        )}

        {/* Step 6: Select Time Slot */}
        {step === 6 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-semibold">Select Time Slot</h2>
            </div>
            <div className="space-y-3">
              {availableSlots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  selected={formData.timeSlot?.id === slot.id}
                  onSelect={() => handleChange('timeSlot', slot)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
          {step > 1 && step < 6 && (
            <Button variant="outline" onClick={handleBack} icon={<ChevronLeft className="w-4 h-4" />}>
              Back
            </Button>
          )}
          <div className="flex-1" />
          {step < 6 ? (
            <Button 
              variant="primary" 
              onClick={handleNext}
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
              disabled={
                (step === 1 && !formData.district) ||
                (step === 2 && !formData.centre) ||
                (step === 3 && !formData.crop) ||
                (step === 4 && !formData.quantity) ||
                (step === 5 && !formData.date)
              }
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleBookSlot}
              loading={loading}
              disabled={!formData.timeSlot}
            >
              Book Slot
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}