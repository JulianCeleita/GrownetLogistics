import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductSearcher from '../../components/ProductSearch'
import { ProductsList } from '../../components/ProductsList'
import { usePackingStore } from '../../store/usePackingStore'
import useTokenStore from '../../store/useTokenStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

function ProductsPacking() {
  const { packingProducts, setFetchPackingProducts, selectedCustomer } =
    usePackingStore()
  const { token } = useTokenStore()
  const [search, setSearch] = useState(false)

  // const { accountNumber } = route.params
  console.log('selectedCustomer', selectedCustomer)

  useEffect(() => {
    setFetchPackingProducts(token, selectedCustomer)
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
          <Text style={ProductStyles.customerTitle}>Restaurant 1</Text>
          <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon2}>
            <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={packingProducts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => <ProductsList section={item} />}
        scrollEnabled
      />
    </SafeAreaView>
  )
}

export default ProductsPacking
