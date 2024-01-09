import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductSearcher from '../../components/ProductSearch'
import { ProductsCard } from '../../components/ProductsCard'
import { usePackingStore } from '../../store/usePackingStore'
import useEmployeeStore from '../../store/useEmployeeStore'
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
  const [search, setSearch] = useState(false)

  useEffect(() => {
    setFetchPackingProducts(employeeToken, selectedCustomer)
  }, [])

  const handleSearch = () => {
    setSearch(true)
  }

  // console.log({ productsPacking })

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
      {productsPacking ? (
        <View>
          <Text style={ProductStyles.category}>
            Order: {productsPacking.reference}
          </Text>
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
                error={error}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ height: 60 }} />}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  )
}

export default ProductsPacking
