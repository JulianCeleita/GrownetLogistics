import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ProductStyles } from '../../styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'

import { PanGestureHandler } from 'react-native-gesture-handler'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import ModalProduct from '../../components/ModalProduct'
import useLoadingStore from '../../store/useLoadingStore'
import useTokenStore from '../../store/useTokenStore'
import { ProductsList } from '../../components/ProductsList'

function ProductsLoading() {
  const { productsLoading, setFetchProductsLoading, selectedCustomerL } =
    useLoadingStore()

  const [search, setSearch] = useState(false)

  // const { accountNumber } = route.params

  const { token } = useTokenStore()
  console.log('selectedCustomer', selectedCustomerL)
  console.log('productsLoading', productsLoading)

  useEffect(() => {
    setFetchProductsLoading(token, selectedCustomerL)
  }, [])

  const handleSearch = () => {
    setSearch(true)
  }
  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <ProductSearcher setSearch={setSearch} />
      ) : (
        <View style={CustomerDayStyles.title2}>
          <Text style={ProductStyles.customerTitle}>Restaurant 1</Text>
          <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon}>
            <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={productsLoading}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => <ProductsList section={item} />}
        scrollEnabled
      />
      {/* <SectionList
          sections={loadingProducts}
          keyExtractor={(item, itemId) => `${itemId}`}
          renderItem={({ item }) => <ProductsCard item={item} />}
          renderSectionHeader={renderSeccionHeader}
          scrollEnabled
          />*/}
    </SafeAreaView>
  )
}
export default ProductsLoading
