import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import ProductSearcher from '../../components/ProductSearch'
import { useShortVanStore } from '../../store/useShortVanStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

function ProductsVan() {
  const { restaurantProducts, setFetchShortVanProducts } = useShortVanStore();
  const [search, setSearch] = useState(false);
  const [vansList, setVansList] = useState([]);
  const { employeeToken } = useEmployeeStore()

  useEffect(() => {
    setFetchShortVanProducts(employeeToken);
  }, []);

  useEffect(() => {
    if (restaurantProducts && Object.keys(restaurantProducts).length > 0) {
      const vans = Object.entries(restaurantProducts).map(([vanName, vanProducts]) => ({
        vanName,
        vanProducts,
      }));
      setVansList(vans);
    }
  }, [restaurantProducts]);

  const handleSearch = () => {
    setSearch(true);
  };

  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <ProductSearcher setSearch={setSearch} />
      ) : (
        <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon2}>
          <Ionicons name="md-search-circle-outline" size={35} color={colors.darkBlue} />
        </TouchableOpacity>
      )}

      <FlatList
        data={vansList}
        renderItem={({ item }) => (
          <View key={item.vanName}>
            <Text
              style={[
                ProductStyles.customerTitle,
                {
                  color: colors.bluePrimary,
                  marginTop: Platform.OS === 'ios' ? 9 : 16,
                  marginBottom: Platform.OS === 'ios' ? 10 : null,
                },
              ]}
            >
              Van: {item.vanName}
            </Text>
            <FlatList
              data={item.vanProducts}
              renderItem={({ item: product, index }) => (
                <ProductsCardBulkVan key={index} item={product} />
              )}
              keyExtractor={(product) => product.id.toString()}
              ListFooterComponent={<View style={{ height: 60 }} />}
            />
          </View>
        )}
        keyExtractor={(item) => item.vanName}
        ListFooterComponent={<View style={{ height: 60 }} />}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      />
    </SafeAreaView>
  );
}

export default ProductsVan