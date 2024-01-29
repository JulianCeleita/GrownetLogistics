import React, { useEffect, useState } from 'react'
import { ProductStyles } from '../styles/ProductStyles'
import { Text, View } from 'react-native'
import { colors } from '../styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'

export const CheckStatusCard = ({
  itemId,
  statePacking,
  stateLoading,
  viewPacking,
  pressedStates,
  rightStates,
  leftStates,
  colorPress,
  colorRight,
  colorLeft,
  isNA,
}) => {
  const [colorCheck, setColorCheck] = useState(colors.gray)
  const [iconCheck, setIconCheck] = useState('questioncircleo')

  useEffect(() => {
    if (!pressedStates[itemId] && !rightStates[itemId] && !leftStates[itemId]) {
      if (viewPacking) {
        if (stateLoading === 'SHORT') {
          setColorCheck(colorLeft)
          setIconCheck('closecircleo')
        } else if (stateLoading === 'ND') {
          setColorCheck(colorPress)
          setIconCheck('arrowright')
        } else if (stateLoading === 'FULL') {
          setColorCheck(colorPress)
          setIconCheck('checkcircleo')
        } else if (stateLoading === 'PD') {
          setColorCheck(colorPress)
          setIconCheck('arrowright')
        } else {
          if (statePacking === 'FULL') {
            setColorCheck(colorPress)
            setIconCheck('checkcircleo')
          } else if (statePacking === 'ND' || statePacking === 'PD') {
            setColorCheck(colorRight)
            console.log('entro aqui oacking')
            setIconCheck('arrowright')
          } else if (statePacking === 'SHORT') {
            setColorCheck(colorLeft)
            setIconCheck('closecircleo')
          }
        }
      } else {
        if (stateLoading === 'FULL') {
          setColorCheck(colorPress)
          setIconCheck('checkcircleo')
        } else if (stateLoading === 'ND' || stateLoading === 'PD') {
          setColorCheck(colorPress)
          setIconCheck('arrowright')
        } else if (stateLoading === 'SHORT') {
          setColorCheck(colorLeft)
          setIconCheck('closecircleo')
        } else if (statePacking === 'SHORT') {
          setColorCheck(colorLeft)
          setIconCheck('closecircleo')
        }
      }
    } else {
      if (pressedStates[itemId] === true) {
        setColorCheck(colorPress)
        setIconCheck('checkcircleo')
      } else if (rightStates[itemId] === true) {
        setColorCheck(colorPress)
        setIconCheck('arrowright')
      } else if (leftStates[itemId] === true) {
        setColorCheck(colorLeft)
        setIconCheck('closecircleo')
      }
    }
  }, [statePacking, pressedStates, rightStates, leftStates])

  let backgroundColorValue = isNA ? colors.bluePrimary : colorCheck

  return (
    <View
      style={[
        ProductStyles.checkBox,
        { backgroundColor: backgroundColorValue },
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
