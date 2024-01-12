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
          <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon2}>
            <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
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
