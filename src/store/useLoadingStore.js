import { create } from 'zustand'
import mainAxios from '../../axios.Config'
import { productsLoading } from '../config/urls.config'

const useLoadingStore = create((set) => {
  return {
    loadingProducts: [
      {
        title: 'Bulk',
        id_tittle: 1,
        data: [
          {
            id: 1,
            name: 'Loading Lechuga',
            quantity: 10,
            packsize: '20 Ea',
            uom: 'Box',
          },
          {
            id: 2,
            name: 'Loading Pepino',
            quantity: 2,
            packsize: '20 Ea',
            uom: 'Box',
          },
          {
            id: 3,
            name: 'Loading Papa',
            quantity: 5,
            packsize: '20 Ea',
            uom: 'Box',
          },
        ],
      },
      {
        title: 'Split',
        id_tittle: 2,
        data: [
          {
            id: 4,
            name: 'Loading Tang',
            quantity: 10,
            packsize: '6 Ea',
            uom: 'Pkt',
          },
          {
            id: 5,
            name: 'Loading Pepsi',
            quantity: 8,
            packsize: '3 Ea',
            uom: 'Pkt',
          },
          {
            id: 6,
            name: 'Loading Fanta',
            quantity: 3,
            packsize: '5 Ea',
            uom: 'Pkt',
          },
        ],
      },
    ],
    setLoadingProducts: (products) => set({ loadingProducts: products }),
    /*
    // TODO LOADING CON PETICIÓN AXIOS

    setLoadingProducts: async (token) => {
      try {
        const response = await mainAxios.get(`${productsLoading}SF004`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const loadingProducts = await response.data

        console.log('response', loadingProducts)
        set({ loadingProducts: loadingProducts })
      } catch (error) {
        console.error('Error during request:', error)
      }
    }, */
  }
})

export default useLoadingStore
