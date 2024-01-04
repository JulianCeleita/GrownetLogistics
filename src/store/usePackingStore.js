import { create } from 'zustand'
import mainAxios from '../../axios.Config'
import { productsPacking } from '../config/urls.config'

export const usePackingStore = create((set) => ({
  packingProducts: [],
  selectedCustomer: null,
  error: null,

  setError: (error) => set(() => ({ error: error })),

  setSelectedCustomer: (customer) =>
    set(() => ({ selectedCustomer: customer })),

  setPackingProducts: (products) => set(() => ({ packingProducts: products })),

  setFetchPackingProducts: async (token, accountNumber) => {
    try {
      const resp = await mainAxios.get(`${productsPacking}${accountNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const products = await resp.data
      console.log('response Products', products)
      set({ packingProducts: products.orders })
    } catch (error) {
      console.error('Error during request packing:', error)
    }
  },
}))
