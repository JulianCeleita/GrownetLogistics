import React, { useEffect, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductSearcher from '../../components/ProductSearch'
import { ProductStyles } from '../../styles/ProductStyles'
import { ProductsCard } from '../../components/ProductsCard'

import { Ionicons } from '@expo/vector-icons'
import useLoadingStore from '../../store/useLoadingStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'

function ProductsLoading() {
  const {
    productsLoading,
    setLoadingProducts,
    error,
    setFetchProductsLoading,
    selectedCustomerL,
  } = useLoadingStore()

  const [search, setSearch] = useState(false)

  // const { accountNumber } = route.params

  const { employeeToken } = useEmployeeStore()
  console.log('selectedCustomer', selectedCustomerL)
  console.log('productsLoading', productsLoading)

  useEffect(() => {
    setFetchProductsLoading(employeeToken, selectedCustomerL)
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
          <Text style={ProductStyles.customerTitle}>
              Restaurant 1 - {productsLoading ? productsLoading.reference : 'Loading..'}
            </Text>
          <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon}>
            <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>
      )}
      {productsLoading ? (
        <View>
          <FlatList
            data={productsLoading.data}
            renderItem={({ item, index }) => (
              <ProductsCard
                key={index}
                item={item}
                colorPress={colors.green}
                colorRight={colors.orange}
                colorLeft={colors.danger}
                products={productsLoading}
                setProducts={setLoadingProducts}
                error={error}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ height: 60 }} />}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  )
}
export default ProductsLoading
