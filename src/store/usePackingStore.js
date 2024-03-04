import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { productsPackingConfig } from '../config/urls.config'

export const usePackingStore = create((set) => ({
  productsPacking: null,
  selectedOrder: null,
  error: null,

  setError: (error) => set(() => ({ error: error })),

  setSelectedOrder: (order) => set(() => ({ selectedOrder: order })),

  setProductsPacking: (products) => set(() => ({ productsPacking: products })),

  setFetchPackingProducts: async (token, orderNumber) => {
    try {
      const resp = await mainAxios.get(
        `${productsPackingConfig}${orderNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log('resp.data:', resp.data)
      const products = await resp.data
      set({ productsPacking: products.orders[0] })
    } catch (error) {
      console.error('Error during request packing:', error)
    }
  },
}))
