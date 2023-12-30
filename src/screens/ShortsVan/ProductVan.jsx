import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import { PanGestureHandler } from 'react-native-gesture-handler'

function ProductsVan() {
  const [isPressed, setPressed] = useState(false)
  const [left, setLeft] = useState(false)
  const [search, setSearch] = useState(false)

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
  const handleSearch = () => {
    setSearch(true)
  }
  return (
    <SafeAreaView style={ProductStyles.products}>
      <ScrollView>
        {search ? (
          <ProductSearcher setSearch={setSearch} />
        ) : (
          <View style={ProductStyles.iconContainer}>
            <TouchableOpacity
              onPress={handleSearch}
              style={ProductStyles.iconSearch}
            >
              <Ionicons
                name="md-search-circle-outline"
                size={35}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text
            style={[
              ProductStyles.category,
              {
                color: colors.bluePrimary,
                marginTop: 10,
              },
            ]}
          >
            Restaurant 1
          </Text>
          <TouchableOpacity
            onPress={handlePress}
            style={{ alignItems: 'center' }}
          >
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
                    Missing 15kg
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsVan
