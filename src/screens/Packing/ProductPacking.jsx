import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductStyles } from '../../Styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import ProductsCard from '../../components/ProductsCard'
import { usePackingStore } from '../../store/usePackingStore'
import { FlatList } from 'react-native'
import useTokenStore from '../../store/useTokenStore'

function ProductsPacking({ route }) {

  // const { accountNumber } = route.params

  const { token } = useTokenStore()
  console.log(token);

  const { setProducts, packingProducts } = usePackingStore()

  useEffect(() => {
    setProducts(token, 'SF004')
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />

      {
        packingProducts.length === 0 ? (
          <ProductsCard />
        ) : (
          <FlatList
            data={packingProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductsCard />}
          />
        )
      }

    </SafeAreaView>
  )
}

export default ProductsPacking
