import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductSearcher from '../../components/ProductSearch'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { useShortVanStore } from '../../store/useShortVanStore'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

function ProductsVan() {
  const [search, setSearch] = useState(false)
  const { productsVan } = useShortVanStore()

  const handleSearch = () => {
    setSearch(true)
  }
  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <ProductSearcher setSearch={setSearch} />
      ) : (
        <View style={ProductStyles.iconContainer}>
          <TouchableOpacity
            onPress={handleSearch}
            style={ProductStyles.iconSearch}
          >
            <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text
          style={[
            ProductStyles.category,
            {
              color: colors.bluePrimary,
              marginTop: 10,
            },
          ]}
        >
          Restaurant 1
        </Text>


        {productsVan ? (
          <FlatList
            data={productsVan}
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



      </View>
    </SafeAreaView>
  )
}

export default ProductsVan
