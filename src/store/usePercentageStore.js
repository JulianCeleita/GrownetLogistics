import { create } from 'zustand'
import mainAxios from '../../axios.config';
import { percentageLoading, percentagePacking } from '../config/urls.config';

const usePercentageStore = create((set) => ({
  percentagesP: [],
  percentagesL: [],
  setPercentagesP: (percentages) => {
    set({ percentagesP: percentages })
  },
  setPercentagesL: (percentages) => {
    set({ percentagesL: percentages })
  },
  setFetchPercentagesPacking: async (employeeToken) => {
    try {
      const response = await mainAxios.get(percentagePacking, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      })
      set({ percentagesP: response.data.orders })
    } catch (error) {
      console.error('Error al obtener porcentaje:', error)
    }
  },
  setFetchPercentagesLoading: async (employeeToken) => {
    try {
      const response = await mainAxios.get(percentageLoading, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      })
      set({ percentagesL: response.data.orders })
    } catch (error) {
      console.error('Error al obtener porcentaje:', error)
    }
  },
}))

export default usePercentageStore
