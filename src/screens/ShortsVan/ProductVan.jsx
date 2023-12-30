import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductStyles } from '../../Styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import ProductsCard from '../../components/ProductsCard'

function ProductsVan() {
  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
      <ProductsCard />
    </SafeAreaView>
  )
}

export default ProductsVan
