import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { productsLoadingConfig } from '../config/urls.config'

const useLoadingStore = create((set) => {
  return {
    productsLoading: null,
    selectedOrderL: null,
    error: null,

    setError: (error) => set(() => ({ error: error })),

    setSelectedOrderL: (order) => set(() => ({ selectedOrderL: order })),

    setLoadingProducts: (products) => set({ productsLoading: products }),

    setFetchProductsLoading: async (token, orderNumber) => {
      try {
        const response = await mainAxios.get(
          `${productsLoadingConfig}${orderNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        const productsLoadingData = await response.data
        set({ productsLoading: productsLoadingData.orders[0] })
      } catch (error) {
        console.error('Error during request:', error)
      }
    },
  }
})

export default useLoadingStore
