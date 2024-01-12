import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import ProductSearcher from '../../components/ProductSearch'
import { useShortVanStore } from '../../store/useShortVanStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import { insertShort } from '../../config/urls.config'

function ProductsVan() {
  const { restaurantData, loading, error, setFetchShortVanProducts } =
    useShortVanStore()
  const [search, setSearch] = useState(false)
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertShort)

  useEffect(() => {
    setFetchShortVanProducts(employeeToken)
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
          <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
        </View>
      )}

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
            <View key={restaurant.vanName} style={{ marginBottom: -45 }}>
              <Text
                style={[
                  CustomerDayStyles.restaurantName,
                  {
                    marginBottom: Platform.OS === 'ios' ? 5 : null,
                  },
                ]}
              >
                {restaurant.vanName}
              </Text>
              <FlatList
                data={restaurant.vanProducts}
                renderItem={({ item: product, index }) => (
                  <ProductsCardBulkVan
                    key={index}
                    item={product}
                    handleSubmit={handleSubmit}
                  />
                )}
                keyExtractor={(product) => product.id.toString()}
                ListFooterComponent={<View style={{ height: 60 }} />}
              />
            </View>
          )}
          keyExtractor={(restaurant) => restaurant.vanName}
        />
      )}
    </SafeAreaView>
  )
}

export default ProductsVan
