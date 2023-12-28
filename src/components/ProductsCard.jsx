import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GlobalStyles, colors } from '../Styles/GlobalStyles'
import { ProductStyles } from '../Styles/ProductStyles'

function Products() {
  const [isPressed, setPressed] = useState(false)
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const handlePress = () => {
    setPressed(!isPressed)
    setLeft(false)
    setRight(false)
  }
  const handleGestureEvent = (event) => {
    const { translationX } = event.nativeEvent
    if (translationX > 0) {
      console.log('Deslizamiento hacia la derecha')
      setRight(true)
      setLeft(false)
      setPressed(false)
    } else if (translationX < 0) {
      console.log('Deslizamiento hacia la izquierda')
      setRight(false)
      setLeft(true)
      setPressed(false)
    }
  }

  return (
    <View>
      <Text style={ProductStyles.category}>Bulk</Text>
      <TouchableOpacity onPress={handlePress}>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <View>
            <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
              <View style={ProductStyles.productTittle}>
                <Text style={ProductStyles.tittleCard}>Orange Juice</Text>
                <Text
                  style={[ProductStyles.textCard, { color: colors.danger }]}
                >
                  Missing 10
                </Text>
              </View>
              <View
                style={[
                  ProductStyles.checkBox,
                  {
                    backgroundColor: isPressed
                      ? colors.green
                      : right
                        ? colors.danger
                        : left
                          ? colors.danger
                          : colors.gray,
                  },
                ]}
              >
                <AntDesign
                  name={
                    isPressed
                      ? 'checkcircleo'
                      : right
                        ? 'arrowright'
                        : left
                          ? 'closecircleo'
                          : 'questioncircleo'
                  }
                  size={30}
                  color="white"
                />
              </View>
            </View>
            {right ? (
              <View
                style={[
                  ProductStyles.details,
                  GlobalStyles.boxShadow,
                  { borderColor: colors.danger },
                ]}
              >
                <View style={ProductStyles.information}>
                  <View>
                    <Text style={ProductStyles.textCard}>Quantity:</Text>
                    <Text style={[ProductStyles.textCard, { marginTop: 12 }]}>
                      Notes:
                    </Text>
                  </View>
                  <View style={ProductStyles.inputsCard}>
                    <TextInput
                      style={ProductStyles.input}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={[ProductStyles.input, { marginTop: 8 }]}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    GlobalStyles.btnPrimary,
                    { width: 150, marginTop: 10 },
                  ]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </PanGestureHandler>
      </TouchableOpacity>
    </View>
  )
}

export default Products
