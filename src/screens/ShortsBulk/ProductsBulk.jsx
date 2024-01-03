import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { ProductStyles } from '../../styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'

function ProductsBulk() {
  const [isPressed, setIsPressed] = useState(false)
  const [left, setLeft] = useState(false)
  const [search, setSearch] = useState(false)

  const handlePress = () => {
    setIsPressed(!isPressed)
    setLeft(false)
  }
  const handleGestureEvent = (event) => {
    const { translationX } = event.nativeEvent
    if (translationX < 0) {
      console.log('Deslizamiento hacia la izquierda')
      setLeft(true)
      setIsPressed(false)
    }
  }
  const handleSearch = () => {
    setSearch(true)
  }
  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <ProductSearcher setSearch={setSearch} />
      ) : (
        <View style={CustomerDayStyles.title2}>
          <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
          <TouchableOpacity
            onPress={handleSearch}
            style={CustomerDayStyles.icon}
          >
            {/* <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
      />*/}
          </TouchableOpacity>
        </View>
      )}
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
              <Text
                style={[
                  ProductStyles.textCard,
                  {
                    textDecorationLine: left ? 'line-through' : 'none',
                    color: left,
                  },
                ]}
              >
                Missing 15kg{' '}
              </Text>
            </View>
            <View
              style={[
                ProductStyles.checkBox,
                {
                  backgroundColor: isPressed
                    ? colors.bluePrimary
                    : left
                      ? colors.bluePrimary
                      : colors.gray,
                },
              ]}
            >
              <AntDesign
                name={
                  isPressed
                    ? 'checkcircleo'
                    : left
                      ? 'minuscircleo'
                      : 'questioncircleo'
                }
                size={30}
                color="white"
              />
            </View>
          </View>
        </PanGestureHandler>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProductsBulk
