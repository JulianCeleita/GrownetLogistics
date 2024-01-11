import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { shortVanConfig } from '../config/urls.config'

export const useShortVanStore = create((set) => ({
  restaurantData: [],
  loading: false,
  error: null,
  setError: (error) => set({ error }),
  setFetchShortVanProducts: async (token) => {
    try {
      set({ loading: true, error: null });
      const response = await mainAxios.get(shortVanConfig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status, van } = response.data;

      if (status === 200 && Array.isArray(van)) {
        set({
          restaurantData: van.map((restaurant) => ({
            vanName: restaurant.custom,
            vanProducts: restaurant.products,
          })),
          loading: false,
        });
      } else {
        set({ loading: false, error: 'Error en la respuesta del servidor.' });
      }
    } catch (error) {
      set({ loading: false, error: 'Error de autenticación. Verifica las credenciales.' });
      console.error('Error de autenticación. Verifica las credenciales.', error);
    }
  },
}));