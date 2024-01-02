import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import { usePackingStore } from '../../store/usePackingStore'
import useTokenStore from '../../store/useTokenStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { ProductsList } from '../../components/ProductsList'


function ProductsPacking() {
  const { packingProducts, setPackingProducts } = usePackingStore()
  const [search, setSearch] = useState(false)

  // const { accountNumber } = route.params

  const { token } = useTokenStore()

  useEffect(() => {
    // setPackingProducts(token, 'SF004')
  }, [])

  const handleSearch = () => {
    setSearch(true)
  }

  return (
    <SafeAreaView style={ProductStyles.products}>
      <ScrollView>
        {search ? (
          <ProductSearcher setSearch={setSearch} />
        ) : (
          <View style={CustomerDayStyles.title2}>
            <Text style={ProductStyles.customerTitle}>Restaurant 1</Text>
            <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon}>
              <Ionicons
                name="md-search-circle-outline"
                size={35}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
          </View>
        )}
        {packingProducts.map((section) => (
          <ProductsList section={section} key={section.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsPacking
