import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { getPrepProducts } from '../config/urls.config'

export const usePrepStore = create((set) => ({
  prepProducts: [],
  error: null,
  isLoading: false,
  setError: (error) => set(() => ({ error: error })),

  setPrepProducts: (products) => set(() => ({ prepProducts: products })),

  setFetchPrepProducts: async (token, selectedDate) => {
    try {
      set({ isLoading: true })
      const postData = {
        date: {
          start: selectedDate,
          end: selectedDate,
        },
      }

      const response = await mainAxios.post(getPrepProducts, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('resp.data prep:', response.data.detail_orders)

      set({ prepProducts: response.data.detail_orders })
      set({ isLoading: false }) 
    } catch (error) {
      set({ isLoading: false })
      console.error('Error during request prep:', error)
    }
  },
}))
