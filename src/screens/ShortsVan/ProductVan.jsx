import React, { useCallback, useEffect, useState } from 'react'
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
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
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
      setFetchShortVanProducts(employeeToken, dataVan, toggle)

      return () => {
        setRestaurantData([])
        setToggle(false)
      }
    }, [employeeToken, selectedRoute, selectedDate]),
  )

  useEffect(() => {
    const dataVan = {
      routeName: selectedRoute,
      date: selectedDate,
    }
    setFetchShortVanProducts(employeeToken, dataVan, toggle)
  }, [toggle])

  const updateProductsVan = (itemId, quantity = null, state = null) => {
    const newProducts = restaurantData.map((itemProd) => {
      return {
        ...itemProd,
        products: itemProd.products
          .map((product) => {
            if (product.id === itemId) {
              return {
                ...product,
                packed: quantity,
                state_definitive: state ? state : null,
                quantity_defitive: quantity === null
                  ? null
                  : product.quantity_defitive,
              }
            }
            return product
          })
          .filter(product => !(product.state_definitive === "N/A")),
      }
    })
    setRestaurantData(newProducts)
  }

  const toggleButton = () => {
    setToggle((previousToggle) => !previousToggle)
  }

  return (
    <SafeAreaView style={ProductStyles.products}>
      <View style={CustomerDayStyles.title2}>
        <BtnGoBack
          color={colors.darkBlue}
          top={Platform.OS === 'ios' && !Platform.isPad ? 14 : 14}
        />
        <View>
          <Text style={CustomerDayStyles.customerTitle}>
            {route.params.nameRoute}
          </Text>
          <View style={CustomerDayStyles.titleNA}>
            <Text style={CustomerDayStyles.restaurantTypeTitle}>N/A</Text>
            <TouchableOpacity onPress={toggleButton} activeOpacity={1}>
              <View
                style={[
                  CustomerDayStyles.toggleButton,
                  toggle && CustomerDayStyles.toggleOn,
                  GlobalStyles.boxShadow,
                ]}
              >
                <View
                  style={[
                    CustomerDayStyles.toggleDot,
                    toggle && CustomerDayStyles.toggleDotOff,
                  ]}
                />
                <View
                  style={[
                    CustomerDayStyles.toggleDot2,
                    toggle && CustomerDayStyles.toggleDotOn,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
