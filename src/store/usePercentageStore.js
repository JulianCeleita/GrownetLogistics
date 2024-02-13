import { create } from 'zustand'

const usePercentageStore = create((set) => ({
  percentages: [],
  setPercentages: (percentages) => {
    set({ percentages: percentages })
  },
}))

export default usePercentageStore
