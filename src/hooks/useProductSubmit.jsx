import React, { useEffect, useState } from 'react'
import { useCardState } from './useCardState'
import { insertPacking } from '../config/urls.config.js'
import mainAxios from '../../axios.Config.js';
import useTokenStore from '../store/useTokenStore.js';

export const useProductSubmit = () => {

    const { token } = useTokenStore()

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



        try {
            const response = await mainAxios.post(insertPacking + 'ascxasc', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status === 200) {
                console.log('Datos enviados correctamente', response.data)
            } else {
                throw new Error('Error al enviar los datos')
            }
        } catch (error) {
            console.error('Hubo un error al enviar los datos: ', error)

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
        }

        setIsLoading(false)

    }

    return {
        isLoading,
        handleSubmit
    }
}
