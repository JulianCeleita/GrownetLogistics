import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { allOrdersByDate, deliveryRoutes } from '../config/urls.config'

const useOrdersByDate = create((set) => {
  return {
    selectedDate: '',
    selectedRoute: '',
    routesByDate: [],
    ordersByDate: [],
    setSelectedDate: (date) => {
      set({ selectedDate: date })
    },
    setSelectedRoute: (route) => {
      set({ selectedRoute: route })
    },
    setRoutesByDate: async (token) => {
      try {
        const dateData = {
          date: selectedDate,
        }
        const response = await mainAxios.get(deliveryRoutes, dateData, {
          headers: {  
            Authorization: `Bearer ${token}`,
          },
        })
        const RoutesByDate = await response.data.routes

        console.log('RoutesByDate', RoutesByDate)
        set({ routesByDate: RoutesByDate })
      } catch (error) {
        console.error('Error during request:', error)
      }
    },
    setOrdersByDate: async (token) => {
      try {
        const response = await mainAxios.get(allOrdersByDate, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const OrderByDate = await response.data.orders

        console.log('OrderByDate', OrderByDate)
        set({ ordersByDate: OrderByDate })
      } catch (error) {
        console.error('Error during request:', error)
      }
    },
  }
})

export default useOrdersByDate
