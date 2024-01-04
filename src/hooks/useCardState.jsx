import React, { useState } from 'react'

export const useCardState = () => {

    const [pressedStates, setPressedStates] = useState({})
    const [rightStates, setRightStates] = useState({})
    const [leftStates, setLeftStates] = useState({})

    return {
        pressedStates,
        rightStates,
        leftStates,
        setPressedStates,
        setRightStates,
        setLeftStates
    }
}
