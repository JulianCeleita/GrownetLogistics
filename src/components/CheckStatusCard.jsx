import React, { useEffect, useState } from 'react'
import { ProductStyles } from '../styles/ProductStyles'
import { Text, View } from 'react-native'
import { colors } from '../styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'

export const CheckStatusCard = ({
  itemId,
  statePacking,
  stateLoading,
  statePrep,
  prepCard,
  viewPacking,
  pressedStates,
  rightStates,
  leftStates,
  colorPress,
  colorLeft,
  isNA,
}) => {
  const [colorCheck, setColorCheck] = useState(colors.gray)
  const [iconCheck, setIconCheck] = useState('questioncircleo')

  useEffect(() => {
    if (!pressedStates[itemId] && !rightStates[itemId] && !leftStates[itemId]) {
      if (prepCard) {
        if (statePrep) {
          if (statePrep === 'SHORT') {
            setColorCheck(colorLeft)
            setIconCheck('closecircleo')
          } else if (statePrep === 'ND') {
            setColorCheck(colorPress)
            setIconCheck('arrowright')
          } else if (statePrep === 'FULL') {
            setColorCheck(colorPress)
            setIconCheck('checkcircleo')
          } else if (statePrep === 'PD') {
            setColorCheck(colorPress)
            setIconCheck('arrowright')
          }
        }
      } else if (viewPacking) {
        //Vista packing
        if (statePacking === null) {
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
          }
        } else {
          if (statePacking === 'SHORT') {
            setColorCheck(colorLeft)
            setIconCheck('closecircleo')
          } else if (statePacking === 'ND') {
            setColorCheck(colorPress)
            setIconCheck('arrowright')
          } else if (statePacking === 'FULL') {
            setColorCheck(colorPress)
            setIconCheck('checkcircleo')
          } else if (statePacking === 'PD') {
            setColorCheck(colorPress)
            setIconCheck('arrowright')
          }
        }
      } else {
        if (stateLoading === null) {
          if (statePacking === 'SHORT') {
            setColorCheck(colorLeft)
            setIconCheck('closecircleo')
          }
        }
        if (stateLoading === 'FULL') {
          setColorCheck(colorPress)
          setIconCheck('checkcircleo')
        } else if (stateLoading === 'ND' || stateLoading === 'PD') {
          setColorCheck(colorPress)
          setIconCheck('arrowright')
        } else if (stateLoading === 'SHORT') {
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
  }, [statePacking, pressedStates, rightStates, leftStates, statePrep])

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
