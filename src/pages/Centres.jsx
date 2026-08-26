import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CentreCard from '../components/common/CentreCard'
import { centres } from '../data/mockData'
import { Search, MapPin } from 'lucide-react'

export default function Centres({ user }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCentres, setFilteredCentres] = useState(centres)

  useEffect(() => {
    const filtered = centres.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCentres(filtered)
  }, [searchTerm])

  const handleBookSlot = (centre) => {
    navigate('/book-slot')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Procurement Centres</h1>
          <p className="text-gray-500">Find and book slots at centres near you</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search centres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition border-gray-300 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCentres.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl p-8 text-center card-shadow border border-gray-100">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No centres found matching your search</p>
          </div>
        ) : (
          filteredCentres.map((centre) => (
            <CentreCard
              key={centre.id}
              centre={centre}
              onBookSlot={handleBookSlot}
            />
          ))
        )}
      </div>
    </div>
  )
}