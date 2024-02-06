import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
import ProductSearcher from '../../components/ProductSearch'
import { ProductsCard } from '../../components/ProductsCard'
import { AnimatedSearch, AnimatedSearchCard } from '../../components/animation'
import { insertPacking } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { usePackingStore } from '../../store/usePackingStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles, SearchStyles } from '../../styles/ProductStyles'

function ProductsPacking({ route }) {
  const {
    productsPacking,
    setProductsPacking,
    error,
    setFetchPackingProducts,
    selectedOrder,
  } = usePackingStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertPacking)
  const [search, setSearch] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')

  const handleSearch = () => {
    setSearch(true)
  }

  const filteredData =
    productsPacking && productsPacking.data
      ? productsPacking.data.filter((item) =>
        item.name.toLowerCase().includes(searchPhrase.toLowerCase()),
      ) : []

  useFocusEffect(
    useCallback(() => {
      setFetchPackingProducts(employeeToken, selectedOrder)
      return () => {
        setProductsPacking(null)
      }
    }, [employeeToken, selectedOrder]),
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
      {search ? (
        <View>
          <AnimatedSearch search={search}>
            <BtnGoBack color={colors.darkBlue} top={20} />
            <ProductSearcher
              setSearch={setSearch}
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
            />
          </AnimatedSearch>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 43, width: '100%' }}>
          <BtnGoBack color={colors.darkBlue} />
          <View>
            <Text style={ProductStyles.customerTitle}>
              <Text>{route.params.accountName} - </Text>
              <Text style={{ flexWrap: 'wrap' }}>
                {productsPacking ? route.params.orderNumber : 'Loading...'}
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
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={210}
        showsVerticalScrollIndicator={false}
        style={{ marginRight: -3 }}
        contentContainerStyle={{ paddingRight: 3 }}
      >
        <ScrollView>
          {productsPacking ? (
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
                          colorPress={colors.orange}
                          colorRight={colors.orange}
                          colorLeft={colors.danger}
                          products={productsPacking}
                          setProducts={setProductsPacking}
                          handleSubmit={handleSubmit}
                          viewPacking
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

export default ProductsPacking
