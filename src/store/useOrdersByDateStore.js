import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { deliveryRoutes } from '../config/urls.config'

const useOrdersByDate = create((set) => {
  return {
    selectedRoute: '',
    routesByDate: [],
    ordersByDate: [],
    selectedRoute: '',
    selectedDate: '',
    setSelectedDate: (selectedDate) => {
      set({ selectedDate })
    },
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

        let RoutesByDate = await response.data.routes
        RoutesByDate.sort((a, b) => {
          return a.nameRoute.localeCompare(b.nameRoute)
        })

        set({ routesByDate: RoutesByDate })
      } catch (error) {
        console.error('Error during request:', error)
      }
    },
    setSelectedRoute: (route) => {
      set({ selectedRoute: route })
    },
    setOrdersByDate: (nameRoute, routesByDate) => {
      const selectedRoute = routesByDate.find(
        (route) => route.nameRoute === nameRoute,
      )
      if (selectedRoute) {
        const orderByDate = selectedRoute.accounts || []
        set({ ordersByDate: orderByDate })
      } else {
        console.error(
          'No se encontró la ruta con el nombre especificado:',
          nameRoute,
        )
      }
    },
  }
})

export default useOrdersByDate
