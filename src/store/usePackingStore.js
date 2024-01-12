import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { productsPackingConfig } from '../config/urls.config'

export const usePackingStore = create((set) => ({
  productsPacking: null,
  selectedCustomer: null,
  error: null,
  percentages: [],

  setPercentages: (percentaje) => set(() => ({ percentages: percentaje })),

  setError: (error) => set(() => ({ error: error })),

  setSelectedCustomer: (customer) =>
    set(() => ({ selectedCustomer: customer })),

  setProductsPacking: (products) => set(() => ({ productsPacking: products })),

  setFetchPackingProducts: async (token, accountNumber) => {
    try {
      const resp = await mainAxios.get(
        `${productsPackingConfig}${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const products = await resp.data

      console.log('response Products.orders', products.orders)
      set({ productsPacking: products.orders[0] })
    } catch (error) {
      console.error('Error during request packing:', error)
    }
  },
}))
