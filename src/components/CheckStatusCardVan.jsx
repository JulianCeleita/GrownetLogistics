import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ProductStyles } from '../styles/ProductStyles'
import { colors } from '../styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'

export const CheckStatusCardVan = ({ item, isPressed, right, left, isNA }) => {

    const [iconCheck, setIconCheck] = useState('questioncircleo')
    const [colorCheck, setColorCheck] = useState(colors.gray)

    useEffect(() => {

        if (!isPressed && !right && !left && !isNA) {
            if (item.state_definitive === 'FULL') {
                setColorCheck(colors.bluePrimary)
                setIconCheck('checkcircleo')
            } else if (item.state_definitive === 'SHORT') {
                setColorCheck(colors.danger)
                setIconCheck('minuscircleo')
            } else if (item.state_definitive === 'N/A') {
                setColorCheck(colors.danger)
                setIconCheck('minuscircleo')
            }

        } else {
            if (isPressed || right) {
                setColorCheck(colors.bluePrimary)
                setIconCheck('checkcircleo')
            } else if (left || isNA) {
                setColorCheck(colors.danger)
                setIconCheck('minuscircleo')
            }
        }

    }, [isPressed, right, left, isNA])


    return (
        <View
            style={[
                ProductStyles.checkBox,
                {
                    backgroundColor: colorCheck
                },
            ]}
        >
            <AntDesign
                name={iconCheck}
                size={30}
                color="white"
            />
        </View>
    )
}
