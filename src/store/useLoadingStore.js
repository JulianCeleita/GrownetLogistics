import { create } from 'zustand'
import mainAxios from '../../axios.Config'
import { productsLoading } from '../config/urls.config'

const useLoadingStore = create((set) => {
  return {
    Orders: [],
    setOrders: async (token) => {
      try {
        const response = await mainAxios.get(`${productsLoading}SF004`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const orders = await response.data

        console.log('response', orders)
        set({ Orders: orders })
      } catch (error) {
        console.error('Error during request:', error)
      }
    },
  }
})

export default useLoadingStore
