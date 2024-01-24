import React, { useEffect } from 'react'
import { ActivityIndicator, Platform, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
import { ProductsCard } from '../../components/ProductsCard'
import { insertPacking } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { usePackingStore } from '../../store/usePackingStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
function ProductsPacking({ route }) {
  const {
    productsPacking,
    setProductsPacking,
    error,
    setFetchPackingProducts,
    selectedOrder,
  } = usePackingStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertPacking)

  useEffect(() => {
    setFetchPackingProducts(employeeToken, selectedOrder)
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <BtnGoBack color={colors.darkBlue} top={Platform.OS === 'ios' && !Platform.isPad ? 67 : 10} />
      <View style={{ paddingHorizontal: 43, width: '100%' }}>
        <View style={ProductStyles.customerTitleContainer}>
          <Text style={ProductStyles.customerTitle}>
            <Text>{route.params.accountName} - </Text>
            <Text style={{ flexWrap: 'wrap' }}>
              {productsPacking ? route.params.orderNumber : 'Loading...'}
            </Text>
          </Text>
        </View>
      </View>
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={210}>
        <ScrollView>
          {productsPacking ? (
            <View style={ProductStyles.cardsProducts}>
              {Object.entries(
                productsPacking.data.reduce((grouped, product) => {
                  const key = product.presentationType
                  if (!grouped[key]) {
                    grouped[key] = []
                  }
                  grouped[key].push(product)
                  return grouped
                }, {}),
              ).map(([group, products]) => (
                <View key={group}>
                  <Text style={CustomerDayStyles.restaurantTypeTitle}>
                    {group}
                  </Text>
                  {products.map((product) => (
                    <ProductsCard
                      key={product.id}
                      item={product}
                      colorPress={colors.orange}
                      colorRight={colors.orange}
                      colorLeft={colors.danger}
                      products={productsPacking}
                      setProducts={setProductsPacking}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default ProductsPacking
