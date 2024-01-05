import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductSearcher from '../../components/ProductSearch'
import { ProductsCard } from '../../components/ProductsCard'
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

  useEffect(() => {
    setFetchPackingProducts(token, selectedCustomer)
  }, [])

  const handleSearch = () => {
    setSearch(true)
  }

  console.log({ packingProducts });

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

      <View>
        {/* TODO: En la respuesta de la api hay que eliminar el nivel de arreglo en orders para que solo envie un objeto */}
        <Text style={ProductStyles.category}>Order: {packingProducts[0].reference}</Text>
        {
          packingProducts[0].data.map((item, index) => (
            <ProductsCard key={index} item={item} />
          ))
        }
      </View>
    </SafeAreaView>
  )
}

export default ProductsPacking
