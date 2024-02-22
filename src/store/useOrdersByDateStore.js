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
    isLoading: false,
    setSelectedDate: (date) => {
      set({ selectedDate: date })
    },
    setSelectedRoute: (route) => {
      set({ selectedRoute: route })
    },
    setRoutesByDateClean: (routes) => {
      set({ routesByDate: routes })
    },
    setOrdersByDateClean: (orders) => {
      set({ ordersByDate: orders })
    },
    setRoutesByDate: async (token, date) => {
      try {
        set({ isLoading: true })
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
          let numA = parseInt(a.nameRoute.substring(1));
          let numB = parseInt(b.nameRoute.substring(1));
          return numA - numB;
        })

        set({ routesByDate: RoutesByDate })
        set({ isLoading: false })
      } catch (error) {
        set({ isLoading: false })
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
