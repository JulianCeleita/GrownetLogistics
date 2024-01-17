import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Platform, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { insertShort } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useShortBulkStore } from '../../store/useShortBulkStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { ProductStyles } from '../../styles/ProductStyles'

function ProductsBulk() {
  const { typeData, loading, error, setFetchShortBulkProducts } =
    useShortBulkStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertShort)

  useEffect(() => {
    setFetchShortBulkProducts(employeeToken)
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <View style={CustomerDayStyles.title2}>
        <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={typeData}
          renderItem={({ item: type }) => (
            <>
              <View key={type.bulkType} style={{ marginBottom: -50 }}>
                <Text
                  style={[
                    CustomerDayStyles.restaurantTypeTitle,
                    {
                      marginBottom: Platform.OS === 'ios' ? 5 : null,
                    },
                  ]}
                >
                  {type.bulkType}
                </Text>
              </View>
              <View style={{ marginTop: 15 }}>
                {type.bulkProducts.map((product, index) => (
                  <ProductsCardBulkVan
                    key={product.id + index}
                    item={product}
                    handleSubmit={handleSubmit}
                  />
                ))}
              </View>
            </>
          )}
          keyExtractor={(type) => `${type.bulkType}`}
          style={{ marginTop: 20 }}
        />
      )}
    </SafeAreaView>
  )
}

export default ProductsBulk
