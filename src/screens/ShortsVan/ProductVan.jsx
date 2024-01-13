import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { insertShort } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useShortVanStore } from '../../store/useShortVanStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { ProductStyles } from '../../styles/ProductStyles'

function ProductsVan() {
  const { restaurantData, loading, error, setFetchShortVanProducts } =
    useShortVanStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertShort)

  useEffect(() => {
    setFetchShortVanProducts(employeeToken)
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
          data={restaurantData}
          renderItem={({ item: restaurant }) => (
            <>
              <View key={restaurant.vanName} style={{ marginBottom: -45 }}>
                <Text
                  style={[
                    CustomerDayStyles.restaurantTypeTitle,
                    {
                      marginBottom: Platform.OS === 'ios' ? 5 : null,
                    },
                  ]}
                >
                  {restaurant.vanName}
                </Text>
              </View>
              <View style={{ marginTop: 50 }}>
                {restaurant.vanProducts.map((product, index) => (
                  <ProductsCardBulkVan
                    key={product.id}
                    item={product}
                    handleSubmit={handleSubmit}
                  />
                ))}
              </View>
            </>
          )}
          keyExtractor={(restaurant) => restaurant.vanName}
          style={{ marginTop: 40 }}
        />
      )}
    </SafeAreaView>
  )
}

export default ProductsVan
