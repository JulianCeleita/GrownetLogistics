import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles, colors } from '../Styles/GlobalStyles'
import { ProductStyles } from '../Styles/ProductStyles'
import ProductSearcher from '../components/ProductSearch'
//import Swipelist from 'react-native-swipeable-list-view'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

function Products() {
  const [isPressed, setPressed] = useState(false)

  const handlePress = () => {
    setPressed(!isPressed)
  }
  const data = [
    { name: 'Tomate' },
    { name: 'Apple' },
    { name: 'Avocado' },
    { name: 'Banana' },
  ]

  const handleGestureEvent = (event) => {
    // Implementar lógica para manejar el gesto según la dirección
    const { translationX } = event.nativeEvent
    if (translationX > 0) {
      // Deslizamiento hacia la derecha
      console.log('Deslizamiento hacia la derecha')
    } else if (translationX < 0) {
      // Deslizamiento hacia la izquierda
      console.log('Deslizamiento hacia la izquierda')
    }
  }

  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
      ></PanGestureHandler>
      <TouchableOpacity onPress={handlePress} style={ProductStyles.card}>
        <View style={ProductStyles.productTittle}>
          <Text style={ProductStyles.tittleCard}>Orange Juice</Text>
          <Text style={ProductStyles.textCard}>15 Kg - Box</Text>
        </View>
        <View
          style={[
            ProductStyles.checkBox,
            isPressed && { backgroundColor: colors.green },
          ]}
        >
          <AntDesign
            name={isPressed ? 'checkcircleo' : 'questioncircleo'}
            size={30}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Products
