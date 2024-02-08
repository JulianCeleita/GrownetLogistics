import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { productsPackingConfig } from '../config/urls.config'

export const useRoutesByDateStore = create((set) => ({
  routesByDate: null,
  isLoading: null,
  setIsLoading: (value) => set(() => ({ isLoading: value })),
  setRoutesByDate: (value) => set(() => ({ routesByDate: value })),
  setFetchRoutesByDate: async (token, date) => {
    try {
        const resp = await mainAxios.post(productsPackingConfig, {date},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        
        console.log('response', resp);
    //   const routes = await resp.data
    //   set({ routesByDate:  })
    } catch (error) {
      console.error('Error during request packing:', error)
    }
  },
}))