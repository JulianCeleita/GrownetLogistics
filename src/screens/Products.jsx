import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../Styles/GlobalStyles'
import { ProductStyles } from '../Styles/ProductStyles'
import ProductSearcher from '../components/ProductSearch'
import CheckBox from '../components/CheckBox'
import { AntDesign } from '@expo/vector-icons'

function Products() {
  const [isPressed, setPressed] = useState(false)

  const handlePress = () => {
    setPressed(!isPressed)
  }
  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
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
