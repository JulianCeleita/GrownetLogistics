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

function ProductsLoading({ route }) {
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
              <Text>{route.params.accountName} - </Text>
              <Text style={{ flexWrap: 'wrap' }}>
                {productsLoading ? route.params.orderNumber : 'Loading...'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {productsLoading ? (
        <View style={ProductStyles.cardsProducts}>
          {productsLoading.data.map((item, index) => (
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
          ))}
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
