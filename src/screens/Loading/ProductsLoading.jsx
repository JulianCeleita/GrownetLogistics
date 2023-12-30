import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductStyles } from '../../styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import ProductsCard from '../../components/ProductsCard'

function ProductsLoading() {
  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
      <ProductsCard />
    </SafeAreaView>
  )
}

export default ProductsLoading
