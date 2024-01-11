import { create } from 'zustand'
import mainAxios from '../../axios.config'
import { shortVanConfig } from '../config/urls.config'

export const useShortVanStore = create((set) => ({
    restaurantProducts: {}, 
    error: null,
    setError: (error) => set(() => ({ error: error })),
    setFetchShortVanProducts: async (token) => {
        
       try {
            const response = await mainAxios.get(
              shortVanConfig,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
          
            const products = await response.data.orders[0].products;
            const groupedProducts = groupShortVanProductsByRestaurant(products);
            set((state) => ({
              restaurantProducts: {
                ...state.restaurantProducts,
                ...groupedProducts,
              },
            }));
          
            console.log('Restaurant Products:', state.restaurantProducts);
          } catch (error) {
            
              console.error('Error de autenticación. Verifica las credenciales.',error);
          
          }
        },
  }));
  