import { create } from 'zustand'
import mainAxios from '../../axios.Config'
import { productsPacking } from '../config/urls.config'

export const usePackingStore = create((set) => ({
  packingProducts: [
    {
      title: 'Bulk',
      id_tittle: 1,
      customerName: 'Bar reataurant',
      data: [
        {
          id: 1,
          name: 'Packing Tomate',
          quantity: 10,
          packsize: '20 Ea',
          uom: 'Box',
        },
        {
          id: 2,
          name: 'Packing Pimenton',
          quantity: 2,
          packsize: '20 Ea',
          uom: 'Box',
        },
        {
          id: 3,
          name: 'Packing Cebolla',
          quantity: 5,
          packsize: '20 Ea',
          uom: 'Box',
        },
      ],
    },
    {
      title: 'Split',
      id_tittle: 2,
      customerName: 'Bar reataurant',
      data: [
        {
          id: 4,
          name: 'Packing Coca-cola',
          quantity: 10,
          packsize: '6 Ea',
          uom: 'Pkt',
        },
        {
          id: 5,
          name: 'Packing Sprite',
          quantity: 8,
          packsize: '3 Ea',
          uom: 'Pkt',
        },
        {
          id: 6,
          name: 'Packing Postobon',
          quantity: 3,
          packsize: '5 Ea',
          uom: 'Pkt',
        },
      ],
    },
  ],
  setPackingProducts: (products) => set({ packingProducts: products }),
  /* 
  // TODO PACKING CON PETICIÓN AXIOS

  setPackingProducts: async (token, accountNumber) => {
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
  }, */
}))
