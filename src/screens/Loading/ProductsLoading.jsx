import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductStyles } from '../../styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import ProductsCard from '../../components/ProductsCard'
import useLoadingStore from '../../store/useLoadingStore'
import useTokenStore from '../../store/useTokenStore'

function ProductsLoading() {
  const { Orders, setOrders } = useLoadingStore()

  const { token } = useTokenStore()
  console.log('Orders', Orders)
  console.log('token', token)

  useEffect(() => {
    setOrders(token)
  }, [])
  return (
    <SafeAreaView style={ProductStyles.products}>
      <ProductSearcher />
      <ProductsCard />
    </SafeAreaView>
  )
}

export default ProductsLoading
