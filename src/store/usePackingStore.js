import { create } from 'zustand'
import mainAxios from '../../axios.Config';

export const usePackingStore = create((set) => ({
    packingProducts: [],
    getProducts: async (accountNumber) => {
        const resp = await mainAxios.get(`${process.env.EXPO_PUBLIC_PRODUCT_HAS_ORDER}/${accountNumber}`)
        console.log(resp);
    }
}))