import { useState } from 'react'
import mainAxios from '../../axios.config.js'
import { usePackingStore } from '../store/usePackingStore.js'
import useEmployeeStore from '../store/useEmployeeStore.js'

export const useProductSubmit = (insert) => {
  const { employeeToken } = useEmployeeStore()
  const { setError } = usePackingStore()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (
    itemId,
    quantity = 0,
    note = '',
    state = null,
  ) => {
    console.log({ itemId, quantity, note, state });
    setIsLoading(true)
    const data = {
      note,
      id: itemId,
      state: state,
      quantity: quantity,
    }

    try {
      const response = await mainAxios.post(insert, data, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      })
      console.log('DATA ENVIADA AL BACKEND: ', data)
      console.log('Response: ', response.data)

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
