import { create } from 'zustand'
import mainAxios from '../../axios.Config'
import { ordersByDate } from '../config/urls.config'

const useOrdersByDate = create((set) => {
  return {
    OrdersByDate: [],

    setOrdersByDate: async (token) => {
      try {
        const response = await mainAxios.get(ordersByDate, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const OrderByDate = await response.data.orders

        console.log('OrderByDate', OrderByDate)
        set({ OrdersByDate: OrderByDate })
      } catch (error) {
        console.error('Error during request:', error)
      }
    },
  }
})

export default useOrdersByDate
