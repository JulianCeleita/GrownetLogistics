import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
import { ProductsCard } from '../../components/ProductsCard'
import { insertLoading } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import useLoadingStore from '../../store/useLoadingStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import ProductSearcher from '../../components/ProductSearch'

function ProductsLoading({ route }) {
  const {
    productsLoading,
    setLoadingProducts,
    error,
    setFetchProductsLoading,
    selectedOrderL,
  } = useLoadingStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertLoading)
  const [search, setSearch] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')

  const handleSearch = () => {
    setSearch(true)
  }
  const filteredData =
    productsLoading && productsLoading.data
      ? productsLoading.data.filter((item) => item.name.includes(searchPhrase))
      : []

  useFocusEffect(
    useCallback(() => {
      setFetchProductsLoading(employeeToken, selectedOrderL)
      return () => {
        setLoadingProducts(null)
      }
    }, [employeeToken, selectedOrderL]),
  )

  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <View>
          <BtnGoBack color={colors.darkBlue} top={20} />
          <ProductSearcher
            setSearch={setSearch}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 43, width: '100%' }}>
          <BtnGoBack
            color={colors.darkBlue}
            top={Platform.OS === 'ios' && !Platform.isPad ? 67 : 10}
          />
          <View style={ProductStyles.customerTitleContainer}>
            <Text style={ProductStyles.customerTitle}>
              <Text>{route.params.accountName} - </Text>
              <Text style={{ flexWrap: 'wrap' }}>
                {productsLoading ? route.params.orderNumber : 'Loading...'}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSearch}
            style={CustomerDayStyles.icon}
          >
            <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>
      )}
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={210}>
        <ScrollView>
          <View style={CustomerDayStyles.title2}></View>
          {productsLoading ? (
            <View style={ProductStyles.cardsProducts}>
              {Object.entries(
                productsLoading.data.reduce((grouped, product) => {
                  const key = product.presentationType
                  if (!grouped[key]) {
                    grouped[key] = []
                  }
                  grouped[key].push(product)
                  return grouped
                }, {}),
              ).map(([group, products]) => (
                <View key={group}>
                  <Text style={CustomerDayStyles.restaurantTypeTitle}>
                    {group}
                  </Text>
                  {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                      <ProductsCard
                        key={product.id}
                        item={product}
                        colorPress={colors.green}
                        colorRight={colors.green}
                        colorLeft={colors.danger}
                        products={productsLoading}
                        setProducts={setLoadingProducts}
                        handleSubmit={handleSubmit}
                        error={error}
                      />
                    ))
                  ) : (
                    <Text>
                      No hay productos con ese nombre. Busca de nuevo.
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ProductsLoading
