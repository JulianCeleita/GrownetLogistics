import React, { useEffect, useState } from 'react'
import { useCardState } from './useCardState'

export const useProductSubmit = () => {

    const [isLoading, setIsLoading] = useState(false)

    const {
        pressedStates,
        rightStates,
        leftStates,
        setPressedStates,
        setRightStates,
        setLeftStates
    } = useCardState()

    const handleSubmit = async (itemId, quantity = 0, note = '') => {

        setIsLoading(true)

        const data = {
            note,
            quantity: quantity,
            id: itemId,
        }

        console.log('data', data)

        const newPressedStates = { ...pressedStates }
        const newRightStates = { ...rightStates }
        const newLeftStates = { ...leftStates }

        newPressedStates[itemId] = false
        newRightStates[itemId] = false
        newLeftStates[itemId] = false

        setPressedStates(newPressedStates)
        setRightStates(newRightStates)
        setLeftStates(newLeftStates)

        console.log({
            pressedStates,
            rightStates,
            leftStates,
        });

        // try {
        //     const response = await mainAxios.post(insertLoading, data, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     })

        //     if (response.status === 200) {
        //         console.log('Datos enviados correctamente', response.data)
        //     } else {
        //         throw new Error('Error al enviar los datos')
        //     }
        // } catch (error) {
        //     console.error('Hubo un error al enviar los datos: ', error)
        // }

        setIsLoading(false)

    }

    return {
        isLoading,
        handleSubmit
    }
}
