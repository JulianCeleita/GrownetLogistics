import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductStyles } from '../../Styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import ProductsCard from '../../components/ProductsCard'
import { useProducts } from '../../store/useProducts'

function ProductsPacking() {

  const { getProducts, products } = useProducts()

  useEffect(() => {
    // getProducts();
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
      <ProductsCard />
    </SafeAreaView>
  )
}

export default ProductsPacking
