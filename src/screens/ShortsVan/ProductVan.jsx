import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles, colors } from '../../Styles/GlobalStyles'
import { ProductStyles } from '../../Styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import { PanGestureHandler } from 'react-native-gesture-handler'

function ProductsVan() {
  const [isPressed, setPressed] = useState(false)
  const [left, setLeft] = useState(false)

  const handlePress = () => {
    setPressed(!isPressed)
    setLeft(false)
  }
  const handleGestureEvent = (event) => {
    const { translationX } = event.nativeEvent
    if (translationX < 0) {
      console.log('Deslizamiento hacia la izquierda')
      setLeft(true)
      setPressed(false)
    }
  }
  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
      <View>
        <Text style={ProductStyles.category}>Restaurant 1</Text>
        <TouchableOpacity onPress={handlePress}>
          <PanGestureHandler onGestureEvent={handleGestureEvent}>
            <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
              <View style={ProductStyles.productTittle}>
                <Text
                  style={[
                    ProductStyles.tittleCard,
                    {
                      textDecorationLine: left ? 'line-through' : 'none',
                      color: left ? colors.bluePrimary : colors.darkBlue,
                    },
                  ]}
                >
                  Orange Juice
                </Text>
                <Text style={ProductStyles.textCard}>Missing 15kg </Text>
              </View>
              <View
                style={[
                  ProductStyles.checkBox,
                  {
                    backgroundColor: isPressed
                      ? colors.bluePrimary
                      : colors.gray,
                  },
                ]}
              >
                <AntDesign
                  name={isPressed ? 'checkcircleo' : 'questioncircleo'}
                  size={30}
                  color="white"
                />
              </View>
            </View>
          </PanGestureHandler>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProductsVan
