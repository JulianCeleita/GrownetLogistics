import { useEffect, useState } from 'react'
import mainAxios from '../../axios.Config.js'
import { insertPacking } from '../config/urls.config.js'
import useTokenStore from '../store/useTokenStore.js'
import { usePackingStore } from '../store/usePackingStore.js'
let promiseQueue = []

export const useProductSubmit = () => {
  const { token } = useTokenStore()
  const { setError } = usePackingStore()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (itemId, quantity = 0, note = '') => {
    setIsLoading(true)

    const data = {
      note,
      quantity: parseInt(quantity),
      id: itemId,
    }

    console.log('data', data)

    const promise = new Promise((resolve, reject) => {
      mainAxios
        .post(insertPacking, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('Datos enviados correctamente', response.data)
            setError(null)
            resolve()
          } else {
            throw new Error('Error al enviar los datos')
          }
        })
        .catch((error) => {
          console.error('Hubo un error al enviar los datos: ', error)
          setError(error)
          reject(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

    promiseQueue.push(promise)
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
