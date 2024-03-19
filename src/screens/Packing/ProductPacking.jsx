import React, { useCallback, useState, useRef } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
import { ProductsCard } from '../../components/ProductsCard'
import { insertPacking } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { usePackingStore } from '../../store/usePackingStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles, SearchStyles } from '../../styles/ProductStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native'
import ProductSearcher from '../../components/ProductSearch'
import { Ionicons } from '@expo/vector-icons'
import { AnimatedSearch, AnimatedSearchCard } from '../../components/animation'
import ModalDebugger from '../../components/ModalDebugger'

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
  const [showModalDebugger, setShowModalDebugger] = useState(false)
  const [responsableDetails, setResponsableDetails] = useState(false)

  const scrollViewRef = useRef()

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }

  const handlePressIn = () => {
    setResponsableDetails(!responsableDetails)
  }

  const handleSearch = () => {
    setSearch(true)
  }

  const filteredData =
    productsPacking && productsPacking.data
      ? productsPacking.data.filter((item) =>
          item.name.toLowerCase().includes(searchPhrase.toLowerCase()),
        )
      : []

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
            <TouchableOpacity onLongPress={handlePressIn} delayLongPress={500}>
              <Text style={ProductStyles.customerTitle}>
                <Text>{route.params.accountName} - </Text>
                <Text style={{ flexWrap: 'wrap' }}>
                  {productsPacking ? route.params.orderNumber : 'Loading...'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSearch}
            onLongPress={() => setShowModalDebugger(true)}
            delayLongPress={5000}
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
        ref={scrollViewRef}
      >
        <ScrollView>
          {productsPacking ? (
            filteredData.length > 0 ? (
              <AnimatedSearchCard search={search}>
                <View style={ProductStyles.cardsProducts}>
                  {Object.entries(groupedProducts).map(
                    ([group, products], groupIndex, groups) => (
                      <View key={groupIndex}>
                        <Text style={CustomerDayStyles.restaurantTypeTitle}>
                          {group}
                        </Text>
                        {products.map(
                          (product, productIndex, productsArray) => (
                            <View key={productIndex}>
                              <ProductsCard
                                item={product}
                                colorPress={colors.orange}
                                colorRight={colors.orange}
                                colorLeft={colors.danger}
                                products={productsPacking}
                                setProducts={setProductsPacking}
                                handleSubmit={handleSubmit}
                                viewPacking
                                error={error}
                                responsableDetails={responsableDetails}
                                userPacking={product.user_packing}
                                datePacking={product.date_packing}
                                userLoading={product.user_loading}
                                dateLoading={product.date_loading}
                                scrollToEnd={
                                  groupIndex === groups.length - 1 &&
                                  productIndex === productsArray.length - 1
                                    ? scrollToEnd
                                    : undefined
                                }
                                isDisabled={route.params.isDisabled}
                              />
                            </View>
                          ),
                        )}
                      </View>
                    ),
                  )}
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
      <ModalDebugger
        showModalDebugger={showModalDebugger}
        setShowModalDebugger={setShowModalDebugger}
        Title="Debugger"
        message={JSON.stringify(groupedProducts, null, 2)}
      />
    </SafeAreaView>
  )
}

export default ProductsPacking
