import React, { useCallback, useState, useRef } from 'react'
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
import { insertPrep } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles, SearchStyles } from '../../styles/ProductStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native'
import ProductSearcher from '../../components/ProductSearch'
import { Ionicons } from '@expo/vector-icons'
import { AnimatedSearch, AnimatedSearchCard } from '../../components/animation'
import ModalDebugger from '../../components/ModalDebugger'
import { usePrepStore } from '../../store/usePrepStore'
import useOrdersByDate from '../../store/useOrdersByDateStore'

function PrepProductsComp() {
  const {
    setFetchPrepProducts,
    prepProducts,
    setPrepProducts,
    error,
    isLoading,
  } = usePrepStore()
  const { selectedDate } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertPrep)
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

  const filteredData = prepProducts?.filter((item) =>
    item.product_name.includes(searchPhrase),
  )

  useFocusEffect(
    useCallback(() => {
      setFetchPrepProducts(employeeToken, selectedDate)
      return () => {
        setPrepProducts(null)
      }
    }, [employeeToken, selectedDate]),
  )

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
              <Text style={ProductStyles.customerTitlePrep}>
                <Text style={{ flexWrap: 'wrap' }}>Prep</Text>
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
          {!isLoading ? (
            <View>
              {prepProducts && filteredData.length > 0 ? (
                <AnimatedSearchCard search={search}>
                  <View style={ProductStyles.cardsProducts}>
                    <View>
                      {filteredData.map((product, indexFilter, arrayData) => (
                        <View key={indexFilter}>
                          <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Text style={CustomerDayStyles.restaurantTypeTitle}>
                              {product.product_name} -
                            </Text>
                            <Text
                              style={[
                                CustomerDayStyles.restaurantTypeTitle,
                                { color: colors.gray, fontSize: 15 },
                              ]}
                            >
                              {product.presentation_name}
                            </Text>
                            <Text style={CustomerDayStyles.restaurantTypeTitle}>-</Text>
                            <Text style={[
                              CustomerDayStyles.restaurantTypeTitle,
                              { color: colors.bluePrimary, fontWeight: '900' },
                            ]}>
                              {product.quantity}
                            </Text>
                          </View>
                          {product.products.map((e, index, array) => (
                            <View key={index}>
                              <ProductsCard
                                item={e}
                                colorPress={colors.orange}
                                colorRight={colors.orange}
                                colorLeft={colors.danger}
                                products={prepProducts}
                                setProducts={setPrepProducts}
                                handleSubmit={handleSubmit}
                                error={error}
                                responsableDetails={responsableDetails}
                                scrollToEnd={
                                  indexFilter === arrayData.length - 1 &&
                                    index === array.length - 1
                                    ? scrollToEnd
                                    : undefined
                                }
                                prepCard
                              />
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  </View>
                </AnimatedSearchCard>
              ) : (
                <>
                  {prepProducts && filteredData.length <= 0 ? (
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
                  ) : null}
                </>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 40,
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
        message={JSON.stringify(filteredData, null, 2)}
      />
    </SafeAreaView>
  )
}

export default PrepProductsComp
