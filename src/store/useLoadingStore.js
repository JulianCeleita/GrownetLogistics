import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { productsLoadingConfig } from '../config/urls.config'

const useLoadingStore = create((set) => {
  return {
    productsLoading: null,
    selectedCustomerL: null,
    error: null,
    percentages: [],

    setPercentages: (percentage) => set(() => ({ percentages: percentage })),

    setError: (error) => set(() => ({ error: error })),

    setSelectedCustomerL: (customer) =>
      set(() => ({ selectedCustomerL: customer })),

    setLoadingProducts: (products) => set({ productsLoading: products }),

    setFetchProductsLoading: async (token, accountNumber) => {
      try {
        const response = await mainAxios.get(
          `${productsLoadingConfig}${accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        const productsLoadingData = await response.data.orders[0]

        console.log('response', productsLoadingData)
        set({ productsLoading: productsLoadingData })
      } catch (error) {
        console.error('Error during request:', error)
      }
    },
  }
})

export default useLoadingStore
