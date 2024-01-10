import { create } from 'zustand'

export const useShortVanStore = create(set => ({
    productsVan: [
        {
            "quantity": 4,
            "name": "Red Pepper",
            "presentationName": "x 5Kg",
            "id": 1440,
            "uom": "Box",
            "state_packing": "SHORT",
            "state_loading": "SHORT",
            "quantity_packed" : 3
        },
        {
            "quantity": 2,
            "name": "Apples Granny Smith",
            "presentationName": "12.5 Kg",
            "id": 1441,
            "uom": "Box",
            "state_packing": "SHORT",
            "state_loading": "SHORT",
            "quantity_packed" : 1
        },
        {
            "quantity": 1,
            "name": "Baby Corn",
            "presentationName": "125 Pkt",
            "id": 1442,
            "uom": "Pkt",
            "state_packing": "SHORT",
            "state_loading": "SHORT",
            "quantity_packed" : 3
        },
    ],
    error: null,
    setProductsVan: (products) => set(() => ({ productsVan: products })),
    setError: (error) => set(() => ({ error: error })),
    setFetchProductsVan: async (token, accountNumber) => {
        try {
            const response = await mainAxios.get(
                //TODO: Cambiar el endpoint correspondiente
                `${productsLoadingConfig}${accountNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            const productsLoadingData = await response.data.orders[0]

            console.log('response', productsLoadingData)
            set({ productsLoading: productsLoadingData })
        } catch (error) {
            console.error('Error during request:', error)
        }
    },
}))