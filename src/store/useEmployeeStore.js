import { create } from 'zustand'

const useEmployeeStore = create((set) => ({
    employeeToken: '',
      setEmployeeToken: (newToken) => {
        set({ employeeToken: newToken })
        console.log('Token de empleado guardado:', newToken)
      },
    }))

export default useEmployeeStore