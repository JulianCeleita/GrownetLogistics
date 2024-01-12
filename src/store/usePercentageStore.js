import { create } from 'zustand'

const usePercentageStore = create((set) => ({
  percentages: [],
  setPercentages: (perce) => {
    set({ percentages: perce })
  },
}))

export default usePercentageStore
