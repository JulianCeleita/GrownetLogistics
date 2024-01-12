import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { allOrdersByDate, deliveryRoutes } from '../config/urls.config'

const useOrdersByDate = create((set) => {
  return {
    selectedRoute: '',
    routesByDate: [],
    ordersByDate: [],
    setSelectedRoute: (route) => {
      set({ selectedRoute: route })
    },
    setRoutesByDate: async (token, date) => {
      try {
        const dateData = {
          date: date,
        }
        const response = await mainAxios.post(deliveryRoutes, dateData, {
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
