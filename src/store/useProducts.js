import { create } from 'zustand'
import axios from '../../axios.Config'

export const useProducts = create((set) => ({
    products: [],
    getProducts: async () => {
        const resp = await axios.get('packing/607')
        console.log(resp);
    }
}))