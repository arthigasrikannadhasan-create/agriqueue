export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

export const getUser = () => storage.get('agriqueue_user')
export const setUser = (user) => storage.set('agriqueue_user', user)
export const removeUser = () => storage.remove('agriqueue_user')

export const getBookings = () => storage.get('agriqueue_bookings', [])
export const setBookings = (bookings) => storage.set('agriqueue_bookings', bookings)
export const addBooking = (booking) => {
  const bookings = getBookings()
  bookings.push(booking)
  setBookings(bookings)
  return booking
}

export const getNotifications = () => storage.get('agriqueue_notifications', [])
export const setNotifications = (notifications) => storage.set('agriqueue_notifications', notifications)
export const addNotification = (notification) => {
  const notifications = getNotifications()
  notifications.unshift({ ...notification, id: `N${Date.now()}`, read: false })
  setNotifications(notifications)
  return notifications[0]
}