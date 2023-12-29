import { create } from 'zustand'
import mainAxios from '../../axios.Config';
import { productsPacking } from '../config/urls.config'

export const usePackingStore = create((set) => ({
    packingProducts: [
        {
            title: 'Vegetales',
            data: [
                {
                    id: 1,
                    name: 'Tomate',
                    quantity: 10,
                    packsize: '20 Ea',
                    uom: 'Box'
                },
                {
                    id: 1,
                    name: 'Pimenton',
                    quantity: 2,
                    packsize: '20 Ea',
                    uom: 'Box'
                },
                {
                    id: 1,
                    name: 'Cebolla',
                    quantity: 5,
                    packsize: '20 Ea',
                    uom: 'Box'
                }
            ]
        },
        {
            title: 'Bebidas',
            data: [
                {
                    id: 1,
                    name: 'Coca-cola',
                    quantity: 10,
                    packsize: '6 Ea',
                    uom: 'Pkt'
                },
                {
                    id: 1,
                    name: 'Sprite',
                    quantity: 8,
                    packsize: '3 Ea',
                    uom: 'Pkt'
                },
                {
                    id: 1,
                    name: 'Postobon',
                    quantity: 3,
                    packsize: '5 Ea',
                    uom: 'Pkt'
                }
            ]
        }
    ],
    setProducts: async (token, accountNumber) => {

        try {
            const resp = await mainAxios.get(`${productsPacking}${accountNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            const products = await resp.data
            console.log('reponse Products', products)
            set({ packingProducts: products.orders })
        } catch (error) {
            console.error('Error during request packing:', error)
        }
    }
}))