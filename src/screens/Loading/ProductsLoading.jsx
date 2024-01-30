import React, { useCallback, useEffect, useState } from 'react'
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
import { ProductStyles, SearchStyles } from '../../styles/ProductStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import ProductSearcher from '../../components/ProductSearch'
import { AnimatedSearch, AnimatedSearchCard } from '../../components/animation'

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
    setSearch((prevSearch) => !prevSearch)
  }

  const filteredData =
    productsLoading && productsLoading.data
      ? productsLoading.data.filter((item) =>
        item.name.toLowerCase().includes(searchPhrase.toLowerCase()),
      )
      : []

  useFocusEffect(
    useCallback(() => {
      setFetchProductsLoading(employeeToken, selectedOrderL)
      return () => {
        setLoadingProducts(null)
      }
    }, [employeeToken, selectedOrderL]),
  )

  const groupedProducts = filteredData.reduce((grouped, product) => {
    const key = product.presentationType
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(product)
    return grouped
  }, {})

  return (
    <SafeAreaView style={ProductStyles.products}>
      <BtnGoBack
        color={colors.darkBlue}
        top={Platform.OS === 'ios' && !Platform.isPad ? 68 : 10}
      />
      {search ? (
        <View>
          <AnimatedSearch search={search}>

            <ProductSearcher
              setSearch={setSearch}
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
            />
          </AnimatedSearch>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 43, width: '100%' }}>
          <View>
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
          {productsLoading ? (
            filteredData.length > 0 ? (

              <AnimatedSearchCard search={search}>
                <View style={ProductStyles.cardsProducts}>
                  {Object.entries(groupedProducts).map(([group, products]) => (
                    <View key={group}>
                      <Text style={CustomerDayStyles.restaurantTypeTitle}>
                        {group}
                      </Text>
                      {products.map((product) => (
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
                      ))}
                    </View>
                  ))}
                </View>
              </AnimatedSearchCard>

            ) : (
              <View style={SearchStyles.alertSearch}>
                <Ionicons
                  name="alert-circle-outline"
                  size={180}
                  color={colors.gray}
                />
                <Text style={SearchStyles.textAlert}>
                  No products found, please search again
                </Text>
              </View>
            )
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
