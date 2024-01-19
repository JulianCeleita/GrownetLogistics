import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
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
      <ScrollView>
        <BtnGoBack color={colors.darkBlue} />
        <View style={CustomerDayStyles.title2}>
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
        </View>

        <View style={ProductStyles.cardsProducts}>
          {productsPacking ? (
            productsPacking.data.map((item, index) => (
              <View key={index}>
                <ProductsCard
                  key={index}
                  item={item}
                  colorPress={colors.orange}
                  colorRight={colors.orange}
                  colorLeft={colors.danger}
                  products={item}
                  setProducts={setProductsPacking}
                  handleSubmit={handleSubmit}
                  viewPacking
                  error={error}
                />

              </View>
            )
            )
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsPacking
