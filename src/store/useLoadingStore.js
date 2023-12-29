import { create } from 'zustand'
import mainAxios from '../../axios.Config'
import { productsLoading } from '../config/urls.config'
import useTokenStore from './useTokenStore'

const useLoadingStore = create((set) => {
  const { token } = useTokenStore()

  return {
    products: [],
    setProducts: async () => {
      const response = await mainAxios.get(productsLoading, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const products = await response.data
      set({ products: products })
    },
  }
})

export default useLoadingStore
