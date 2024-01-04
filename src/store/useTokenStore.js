import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTokenStore = create(
  persist(
    (set) => ({
      token: '1553|HbMwQIJNPcEcN0OgBsFJGJi64EiReI7chF9l9og8',
      setToken: (newToken) => {
        set({ token: newToken })
        console.log('Token guardado:', newToken)
      },
      employeeToken: null,
      setEmployeeToken: (newToken) => {
        set({ employeeToken: newToken })
        console.log('Token de empleado guardado:', newToken)
      },
      initializeToken: async () => {
        try {
          const storedToken = await AsyncStorage.getItem('token')

          if (storedToken) {
            set({ token: JSON.parse(storedToken) })
          } else {
            console.error('no se encontro el token')
          }
        } catch (error) {
          console.error('Error al obtener el token de AsyncStorage:', error)
        }
      },
    }),
    {
      name: 'token-storage',
      storage: {
        getItem: async (name) => {
          const result = await AsyncStorage.getItem(name)
          return result ? JSON.parse(result) : null
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value))
        },
      },
    },
  ),
)

export default useTokenStore
