import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductSearcher from '../../components/ProductSearch'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { useShortBulkStore } from '../../store/useShortBulkStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import useEmployeeStore from '../../store/useEmployeeStore'

function ProductsBulk() {
  const [search, setSearch] = useState(false)
  const { employeeToken } = useEmployeeStore()
  const { productsBulk, setFetchProductsBulk, setProductsBulk } = useShortBulkStore()

  const handleSearch = () => {
    setSearch(true)
  }

  useEffect(() => {
    setFetchProductsBulk(employeeToken)
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <ProductSearcher setSearch={setSearch} />
      ) : (
        <View style={CustomerDayStyles.title2}>
          <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
          <TouchableOpacity
            onPress={handleSearch}
            style={CustomerDayStyles.icon}
          >
            {/* <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />*/}
          </TouchableOpacity>
        </View>
      )}

      {productsBulk ? (
        <FlatList
          data={productsBulk}
          renderItem={({ item, index }) => (
            <ProductsCardBulkVan
              key={index}
              item={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 60 }} />}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}


    </SafeAreaView>
  )
}

export default ProductsBulk
