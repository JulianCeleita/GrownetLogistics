import { useEffect, useState } from 'react'
import mainAxios from '../../axios.config.js'
import { usePackingStore } from '../store/usePackingStore.js'
import useEmployeeStore from '../store/useEmployeeStore.js'
import { useShortVanStore } from '../store/useShortVanStore.js'

export const useProductSubmit = (insert) => {
  const { employeeToken } = useEmployeeStore()
  const { setError } = usePackingStore()
  const { setFetchShortVanProducts } = useShortVanStore()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (
    itemId,
    quantity = 0,
    note = '',
    state = null,
    viewVan,
  ) => {
    setIsLoading(true)

    const data = {
      note,
      id: itemId,
      state: state,
      quantity: quantity.includes('.') || quantity.includes(',') ? parseFloat(quantity) : parseInt(quantity),
    }

    // if (state) {
    //   data.state = state
    // } else {
    //   data.quantity = parseInt(quantity)
    // }
    console.log('datatttt: ', data)
    try {
      const response = await mainAxios.post(insert, data, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      })

      if (response.status === 200) {
        setError(null)
        return response.data
      } else {
        throw new Error('Error al enviar los datos')
      }
    } catch (error) {
      console.error('Hubo un error al enviar los datos: ', error)
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
      viewVan && setFetchShortVanProducts(employeeToken)
    }
  }

  // const executeNextPromise = () => {
  //   if (promiseQueue.length > 0) {
  //     promiseQueue.shift().then(() => {
  //       executeNextPromise()
  //     })
  //   }
  // }

  // useEffect(() => {
  //   executeNextPromise()
  // }, [])

  return {
    isLoading,
    handleSubmit,
  }
}
