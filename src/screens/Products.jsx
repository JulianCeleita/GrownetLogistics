import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles, colors } from '../Styles/GlobalStyles'
import { ProductStyles } from '../Styles/ProductStyles'
import ProductSearcher from '../components/ProductSearch'
import Swipelist from 'react-native-swipeable-list-view'

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

  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
      <Swipelist
        data={data}
        renderRightItem={(data, index) => (
          <View
            key={index}
            style={[ProductStyles.card, GlobalStyles.boxShadow]}
          >
            <View style={ProductStyles.productTittle}>
              <Text style={ProductStyles.tittleCard}>{data.name}</Text>
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
          </View>
        )}
        renderHiddenItem={(data, index) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('hola')
              }}
              style={ProductStyles.ventana}
            >
              <AntDesign name="exclamationcircleo" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
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
