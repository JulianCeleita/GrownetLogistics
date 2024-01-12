import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { shortBulkConfig } from '../config/urls.config'

export const useShortBulkStore = create((set) => ({
  typeData: [],
  loading: false,
  error: null,
  setError: (error) => set({ error }),
  setFetchShortBulkProducts: async (token) => {
    try {
      set({ loading: true, error: null })
      const response = await mainAxios.get(shortBulkConfig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { status, products } = response.data

      if (status === 200 && Array.isArray(products)) {
        const productsByType = products.reduce((acc, product) => {
          const type = product.presentationType

          if (!acc[type]) {
            acc[type] = {
              bulkType: type,
              bulkProducts: [],
            }
          }

          acc[type].bulkProducts.push(product)
          return acc
        }, {})

        const organizedTypeData = Object.values(productsByType)

        set({
          typeData: organizedTypeData,
          loading: false,
        })
      } else {
        set({ loading: false, error: 'Error en la respuesta del servidor.' })
      }
    } catch (error) {
      set({
        loading: false,
        error: 'Error de autenticación. Verifica las credenciales.',
      })
      console.error('Error de autenticación. Verifica las credenciales.', error)
    }
  },
}))
