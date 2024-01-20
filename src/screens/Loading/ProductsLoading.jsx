import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
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
    selectedOrderL,
  } = useLoadingStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertLoading)

  useEffect(() => {
    setFetchProductsLoading(employeeToken, selectedOrderL)
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <ScrollView>
        <BtnGoBack color={colors.darkBlue} />
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
          <View>
            {Object.entries(productsLoading.data.reduce((grouped, product) => {
              const key = product.presentationType;
              if (!grouped[key]) {
                grouped[key] = [];
              }
              grouped[key].push(product);
              return grouped;
            }, {})).map(([group, products]) => (
              <View key={group}>
                {/* TODO: Mejorar el style del titulo */}
                <Text>{group}</Text>
                {products.map((product) => (
                  <ProductsCard
                    key={product.id}
                    item={product}
                    colorPress={colors.green}
                    colorRight={colors.orange}
                    colorLeft={colors.danger}
                    products={productsLoading}
                    setProducts={setLoadingProducts}
                    handleSubmit={handleSubmit}
                    viewPacking
                    error={error}
                  />
                ))}
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
export default ProductsLoading
