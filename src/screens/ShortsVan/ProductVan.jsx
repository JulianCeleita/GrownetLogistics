import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { insertShort } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useShortVanStore } from '../../store/useShortVanStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import { BtnGoBack } from '../../components/BtnGoBack'
import { colors } from '../../styles/GlobalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { useFocusEffect } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function ProductsVan({ route }) {
  const {
    restaurantData,
    setRestaurantData,
    loading,
    error,
    setFetchShortVanProducts,
  } = useShortVanStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertShort)
  const { selectedDate, selectedRoute } = useOrdersByDate()
  const [toggle, setToggle] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const dataVan = {
        routeName: selectedRoute,
        date: selectedDate,
      }
      setFetchShortVanProducts(employeeToken, dataVan)
      return () => {
        setRestaurantData([])
      }
    }, [employeeToken, selectedRoute, selectedDate]),
  )

  const updateProductsVan = (itemId, quantity) => {
    const newProducts = restaurantData.map((itemProd) => {
      return {
        ...itemProd,
        products: itemProd.products.map((product) => {
          if (product.id === itemId) {
            return {
              ...product,
              packed: quantity,
              quantity_defitive:
                quantity === null ? null : product.quantity_defitive,
            }
          }
          return product
        }),
      }
    })
    setRestaurantData(newProducts)
  }

  const toggleButton = () => {
    setToggle(!toggle)
  }

  return (
    <SafeAreaView style={ProductStyles.products}>
      <View style={CustomerDayStyles.title2}>
        <BtnGoBack
          color={colors.darkBlue}
          top={Platform.OS === 'ios' && !Platform.isPad ? 14 : 5}
        />
        <Text style={CustomerDayStyles.customerTitle}>
          {route.params.nameRoute}
        </Text>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'android' ? 210 : 210}
      >
        <ScrollView stickyHeaderIndices={[0]}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Error: {error}</Text>
            </View>
          ) : (
            <View>
              <View>
                <Text style={CustomerDayStyles.restaurantTypeTitle}>N/A</Text>
                <TouchableOpacity onPress={toggleButton}>
                  <View
                    style={[
                      CustomerDayStyles.toggleButton,
                      toggle && CustomerDayStyles.toggleOn,
                    ]}
                  >
                    <View
                      style={[
                        CustomerDayStyles.toggleDot,
                        toggle && CustomerDayStyles.toggleDotOn,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {restaurantData.map((restaurant) => (
                <View key={restaurant.customerName}>
                  <Text style={[CustomerDayStyles.restaurantTypeTitle]}>
                    {restaurant.customerName}
                  </Text>
                  <View>
                    {restaurant.products.map((product, index) => (
                      <ProductsCardBulkVan
                        key={index}
                        item={product}
                        handleSubmit={handleSubmit}
                        updateProductsVan={updateProductsVan}
                      />
                    ))}
                    {console.log(restaurant.products)}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default ProductsVan
