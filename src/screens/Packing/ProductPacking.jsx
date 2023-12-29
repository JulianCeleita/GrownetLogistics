import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductStyles } from '../../Styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import ProductsCard from '../../components/ProductsCard'
import { usePackingStore } from '../../store/usePackingStore'
import { View, Text, SectionList } from 'react-native'
import useTokenStore from '../../store/useTokenStore'


function ProductsPacking({ route }) {

  // const { accountNumber } = route.params

  const { token } = useTokenStore()

  const { setProducts, packingProducts } = usePackingStore()

  const renderSeccionHeader = ({ item }) => (
    <View>
      <Text style={ProductStyles.category}>{item}</Text>
    </View>
  );

  useEffect(() => {
    // setProducts(token, 'SF004')
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />

      <SectionList
        sections={packingProducts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => <ProductsCard item={item} />}
        renderSectionHeader={renderSeccionHeader}
        scrollEnabled
      />

    </SafeAreaView>
  )
}

export default ProductsPacking
