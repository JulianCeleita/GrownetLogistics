import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { getPrepProducts } from '../config/urls.config'

export const usePrepStore = create((set) => ({
  PrepProducts: [],
  //   selectedOrder: null,
  error: null,

  setError: (error) => set(() => ({ error: error })),

  //   setSelectedOrder: (order) => set(() => ({ selectedOrder: order })),

  setPrepProducts: (products) => set(() => ({ PrepProducts: products })),

  setFetchPrepProducts: async (token, selectedDate) => {
    try {
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

      set({ PrepProducts: response.data.detail_orders })
    } catch (error) {
      console.error('Error during request prep:', error)
    }
  },
}))
