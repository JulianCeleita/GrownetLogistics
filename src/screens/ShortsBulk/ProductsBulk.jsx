import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import ProductSearcher from '../../components/ProductSearch'
import { useShortBulkStore } from '../../store/useShortBulkStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import { insertShort } from '../../config/urls.config'

function ProductsBulk() {
  const { typeData, loading, error, setFetchShortBulkProducts } = useShortBulkStore();
  const [search, setSearch] = useState(false);
  const { employeeToken } = useEmployeeStore();
  const { handleSubmit } = useProductSubmit(insertShort)

  useEffect(() => {
    setFetchShortBulkProducts(employeeToken);
  }, []);

  const handleSearch = () => {
    setSearch(true);
  };

  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <ProductSearcher setSearch={setSearch} />
      ) : (
        <View style={CustomerDayStyles.title2}>
          <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
          <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon2}>
            <Ionicons name="md-search-circle-outline" size={35} color={colors.darkBlue} />
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={typeData}
          renderItem={({ item: type }) => (
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
              <FlatList
                data={type.bulkProducts}
                renderItem={({ item: product, index }) => (
                  <ProductsCardBulkVan key={index} item={product} handleSubmit={handleSubmit} />
                )}
                keyExtractor={(product) => product.id.toString()}
                ListFooterComponent={<View style={{ height: 60 }} />}
              />
            </View>
          )}
          keyExtractor={(type) => type.bulkType}
        />
      )}
    </SafeAreaView>
  );
}

export default ProductsBulk
