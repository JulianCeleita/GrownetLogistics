import { create } from 'zustand'
import { shortBulk } from '../config/urls.config'
import mainAxios from '../../axios.config'

export const useShortBulkStore = create(set => ({
    productsBulk: null,
    error: null,
    setProductsBulk: (products) => set(() => ({ productsBulk: products })),
    setError: (error) => set(() => ({ error: error })),
    setFetchProductsBulk: async (token) => {
        try {
            const response = await mainAxios.get(shortBulk,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            const productsBulk = await response.data.products
            set({ productsBulk: productsBulk })
        } catch (error) {
            console.error('Error during request:', error)
        }
    },
}))