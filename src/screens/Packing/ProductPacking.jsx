import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductsCard } from '../../components/ProductsCard'
import { insertPacking } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { usePackingStore } from '../../store/usePackingStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

function ProductsPacking() {
  const {
    productsPacking,
    setProductsPacking,
    error,
    setFetchPackingProducts,
    selectedCustomer,
  } = usePackingStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertPacking)

  useEffect(() => {
    setFetchPackingProducts(employeeToken, selectedCustomer)
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <View style={CustomerDayStyles.title2}>
        <View style={{ paddingHorizontal: 43, width: '100%' }}>
          <View style={ProductStyles.customerTitleContainer}>
            <Text style={ProductStyles.customerTitle}>
              <Text>Restaurant 1 - </Text>
              <Text style={{ flexWrap: 'wrap' }}>
                {productsPacking ? productsPacking.reference : 'Loading...'}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {productsPacking ? (
        <FlatList
          data={productsPacking.data}
          renderItem={({ item, index }) => (
            <ProductsCard
              key={index}
              item={item}
              colorPress={colors.orange}
              colorRight={colors.orange}
              colorLeft={colors.danger}
              products={productsPacking}
              setProducts={setProductsPacking}
              handleSubmit={handleSubmit}
              viewPacking
              error={error}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 60 }} />}
          /* horizontal={false}
          numColumns={Dimensions.get('window').width > 500 ? 2 : 1}
          contentContainerStyle={{
            flexDirection:
              Dimensions.get('window').width > 500 ? 'row' : 'column',

            flexWrap: Dimensions.get('window').width > 500 ? 'wrap' : 'nowrap',
          }}*/
        />
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
    </SafeAreaView>
  )
}

export default ProductsPacking
