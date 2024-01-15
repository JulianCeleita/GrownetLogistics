import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductsCard } from '../../components/ProductsCard'
import { insertLoading } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import useLoadingStore from '../../store/useLoadingStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

function ProductsLoading() {
  const {
    productsLoading,
    setLoadingProducts,
    error,
    setFetchProductsLoading,
    selectedCustomerL,
  } = useLoadingStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertLoading)

  useEffect(() => {
    setFetchProductsLoading(employeeToken, selectedCustomerL)
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <View style={CustomerDayStyles.title2}>
        <View style={{ paddingHorizontal: 43, width: '100%' }}>
          <View style={ProductStyles.customerTitleContainer}>
            <Text style={ProductStyles.customerTitle}>
              <Text>Restaurant 1 - </Text>
              <Text style={{ flexWrap: 'wrap' }}>
                {productsLoading ? productsLoading.reference : 'Loading...'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
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
                handleSubmit={handleSubmit}
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
