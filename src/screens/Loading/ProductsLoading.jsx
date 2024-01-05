import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ProductStyles } from '../../styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'

import { PanGestureHandler } from 'react-native-gesture-handler'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import ModalProduct from '../../components/ModalProduct'
import useLoadingStore from '../../store/useLoadingStore'
import useTokenStore from '../../store/useTokenStore'
import { ProductsList } from '../../components/ProductsList'

function ProductsLoading() {
  const { productsLoading, setFetchProductsLoading, selectedCustomerL } =
    useLoadingStore()
  const [pressedStates, setPressedStates] = useState({})
  const [rightStates, setRightStates] = useState({})
  const [leftStates, setLeftStates] = useState({})
  const [showText, setShowText] = useState(false)
  const [search, setSearch] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [addQuantity, setAddQuantity] = useState(false)

  const positiveOffset = 30
  const negativeOffset = -30

  console.log(
    'PressedStates',
    pressedStates,
    'RightStates',
    rightStates,
    'LeftStates',
    leftStates,
  )

  // const { accountNumber } = route.params

  const { token } = useTokenStore()
  console.log('selectedCustomer', selectedCustomerL)
  console.log('section', productsLoading)

  useEffect(() => {
    setFetchProductsLoading(token, selectedCustomerL)
  }, [])

  const handlePress = (itemId) => {
    setSelectedProduct(itemId)
    const newPressedStates = Object.assign({}, pressedStates)
    const newRightStates = { ...rightStates }
    const newLeftStates = { ...leftStates }

    newPressedStates[itemId] = !newPressedStates[itemId]
    newRightStates[itemId] = false
    newLeftStates[itemId] = false

    const updatedProducts = productsLoading.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            loaded: newPressedStates[itemId] ? item.quantity : '',
          }
        }
        return item
      }),
    }))
    setPressedStates(newPressedStates)
    setRightStates(newRightStates)
    setLeftStates(newLeftStates)
    setLoadingProducts(updatedProducts)
    setAddQuantity(false)
  }

  const handleGestureEvent = (event, itemId) => {
    const { translationX } = event.nativeEvent
    setSelectedProduct(itemId)

    if (translationX > 0) {
      const newPressedStates = { ...pressedStates }
      const newLeftStates = { ...leftStates }

      newPressedStates[itemId] = false
      newLeftStates[itemId] = false

      setPressedStates(newPressedStates)
      setLeftStates(newLeftStates)
      setAddQuantity(true)
      setQuantity('')

      console.log('Dezlizamos a la derecha', itemId)
    } else if (translationX < 0) {
      setShowModal(true)
    }
  }

  const declareNotAvailable = (itemId) => {
    const newLeftStates = Object.assign({}, leftStates)
    const newPressedStates = { ...pressedStates }
    const newRightStates = { ...rightStates }

    newLeftStates[itemId] = !newLeftStates[itemId]
    newPressedStates[itemId] = false
    newRightStates[itemId] = false

    const updatedProducts = productsLoading.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return { ...item, loaded: newLeftStates[itemId] ? 0 : '' }
        }
        return item
      }),
    }))

    setLeftStates(newLeftStates)
    setPressedStates(newPressedStates)
    setRightStates(newRightStates)
    setLoadingProducts(updatedProducts)
    setAddQuantity(false)

    console.log('Dezlizamos a la izquierda', itemId)
  }

  const declareDifferentQty = (itemId) => {
    const newRightStates = Object.assign({}, rightStates)
    newRightStates[itemId] = true

    const updatedProducts = productsLoading.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return { ...item, loaded: newRightStates[itemId] ? quantity : '' }
        }
        return item
      }),
    }))
    setRightStates(newRightStates)
    setShowText(true)
    setLoadingProducts(updatedProducts)
    setSelectedProduct(null)
    setAddQuantity(false)
  }

  const handleSearch = () => {
    setSearch(true)
  }
  return (
    <SafeAreaView style={ProductStyles.products}>
      {search ? (
        <ProductSearcher setSearch={setSearch} />
      ) : (
        <View style={CustomerDayStyles.title2}>
          <Text style={ProductStyles.customerTitle}>Restaurant 1</Text>
          <TouchableOpacity onPress={handleSearch} style={ProductStyles.icon}>
            <Ionicons
              name="md-search-circle-outline"
              size={35}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={productsLoading}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => <ProductsList section={item} />}
        scrollEnabled
      />
      {/* <SectionList
          sections={loadingProducts}
          keyExtractor={(item, itemId) => `${itemId}`}
          renderItem={({ item }) => <ProductsCard item={item} />}
          renderSectionHeader={renderSeccionHeader}
          scrollEnabled
          />*/}
    </SafeAreaView>
  )
}
export default ProductsLoading
