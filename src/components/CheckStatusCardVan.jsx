import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ProductStyles } from '../styles/ProductStyles'
import { colors } from '../styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'

export const CheckStatusCardVan = ({
  item,
  isPressed,
  right,
  left,
  isNA,
  missingStatus,
}) => {
  const [iconCheck, setIconCheck] = useState('questioncircleo')
  const [colorCheck, setColorCheck] = useState(colors.gray)
  useEffect(() => {
    if (missingStatus) {
      setColorCheck(colors.danger)
      setIconCheck('minuscircleo')
    } else if (isNA) {
      setColorCheck(colors.bluePrimary)
      setIconCheck('minuscircleo')
    } else if (isPressed || right) {
      setColorCheck(colors.bluePrimary)
      setIconCheck('checkcircleo')
    } else if (!isPressed && !right && !left) {
      if (item.state_definitive === 'FULL') {
        setColorCheck(colors.bluePrimary)
        setIconCheck('checkcircleo')
      } else if (item.state_definitive === 'SHORT') {
        setColorCheck(colors.danger)
        setIconCheck('minuscircleo')
      } else if (!isNA) {
        setColorCheck(colors.gray)
        setIconCheck('questioncircleo')
      }
    } else if (left) {
      setColorCheck(colors.danger)
      setIconCheck('minuscircleo')
    } else {
      setColorCheck(colors.gray)
      setIconCheck('questioncircleo')
    }
  }, [isPressed, right, left, isNA, missingStatus])

  return (
    <View
      style={[
        ProductStyles.checkBox,
        {
          backgroundColor: colorCheck,
        },
      ]}
    >
      {isNA ? (
        <View>
          <Text style={ProductStyles.textNA}>N/A</Text>
        </View>
      ) : (
        <AntDesign name={iconCheck} size={30} color="white" />
      )}
    </View>
  )
}
