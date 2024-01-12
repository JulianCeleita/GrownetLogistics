import { useEffect, useState } from 'react'
import mainAxios from '../../axios.config.js'
import { usePackingStore } from '../store/usePackingStore.js'
import useEmployeeStore from '../store/useEmployeeStore.js'
let promiseQueue = []

export const useProductSubmit = (insert) => {
  const { employeeToken } = useEmployeeStore()
  const { setError } = usePackingStore()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (itemId, quantity = 0, note = '', state = null) => {
    setIsLoading(true)

    const data = {
      note,
      id: itemId,
    }

    if (state) {
      data.state = state
    } else {
      data.quantity = parseInt(quantity)
    }

    console.log(data);

    try {
      const response = await mainAxios.post(insert, data, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      })

      if (response.status === 200) {
        console.log('Datos enviados correctamente', response.data)
        setError(null)
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

  const executeNextPromise = () => {
    if (promiseQueue.length > 0) {
      promiseQueue.shift().then(() => {
        executeNextPromise()
      })
    }
  }

  useEffect(() => {
    executeNextPromise()
  }, [])

  return {
    isLoading,
    handleSubmit,
  }
}
