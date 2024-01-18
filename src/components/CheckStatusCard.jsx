import React, { useEffect, useState } from 'react'
import { ProductStyles } from '../styles/ProductStyles'
import { View } from 'react-native'
import { colors } from '../styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'

export const CheckStatusCard = ({
    itemId,
    statePacking,
    pressedStates,
    rightStates,
    leftStates,
    colorPress,
    colorRight,
    colorLeft
}) => {

    const [colorCheck, setColorCheck] = useState(colors.gray)
    const [iconCheck, setIconCheck] = useState('questioncircleo')

    useEffect(() => {
        if (!pressedStates[itemId] && !rightStates[itemId] && !leftStates[itemId]) {
            if (statePacking === "FULL") {
                setColorCheck(colorPress)
                setIconCheck('checkcircleo')
            } else if (statePacking === "ND") {
                setColorCheck(colorRight)
                setIconCheck('arrowright')
            } else if (statePacking === "SHORT") {
                setColorCheck(colorLeft)
                setIconCheck('closecircleo')
            }
        } else {
            if (pressedStates[itemId] === true) {
                setColorCheck(colorPress)
                setIconCheck('checkcircleo')
            } else if (rightStates[itemId] === true) {
                setColorCheck(colorRight)
                setIconCheck('arrowright')
            } else if (leftStates[itemId] === true) {
                setColorCheck(colorLeft)
                setIconCheck('closecircleo')
            }
        }

    }, [
        statePacking,
        pressedStates,
        rightStates,
        leftStates,
    ])

    return (
        <View
            style={[
                ProductStyles.checkBox, { backgroundColor: colorCheck },
            ]}
        >
            <AntDesign name={iconCheck} size={30} color="white" />
        </View>
    )
}