import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ProductStyles } from '../../Styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'

import { PanGestureHandler } from 'react-native-gesture-handler'
import { GlobalStyles, colors } from '../../Styles/GlobalStyles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { CustomerDayStyles } from '../../Styles/CustomerDayStyles'
import ModalProduct from '../../components/ModalProduct'
import useLoadingStore from '../../store/useLoadingStore'
import useTokenStore from '../../store/useTokenStore'

function ProductsLoading() {
  const { loadingProducts, setLoadingProducts } = useLoadingStore()
  const [pressedStates, setPressedStates] = useState({})
  const [rightStates, setRightStates] = useState({})
  const [leftStates, setLeftStates] = useState({})
  const [showText, setShowText] = useState(false)
  const [search, setSearch] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [addQuantity, setAddQuantity] = useState(false)

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

  useEffect(() => {
    // setLoadingProducts(token, 'SF004')
  }, [])

  const handlePress = (itemId) => {
    setSelectedProduct(itemId)
    const newPressedStates = Object.assign({}, pressedStates)
    const newRightStates = { ...rightStates }
    const newLeftStates = { ...leftStates }

    newPressedStates[itemId] = !newPressedStates[itemId]
    newRightStates[itemId] = false
    newLeftStates[itemId] = false

    const updatedProducts = loadingProducts.map((section) => ({
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

    const updatedProducts = loadingProducts.map((section) => ({
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

    const updatedProducts = loadingProducts.map((section) => ({
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
      <ScrollView>
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
        {loadingProducts.map((section) => (
          <View key={section.id_tittle}>
            <Text style={ProductStyles.category}>
              {section.id_tittle}. {section.title}
            </Text>
            {section.data.map((item) => (
              <View style={{ alignItems: 'center' }} key={item.id}>
                <TouchableOpacity onPress={() => handlePress(item.id)}>
                  <PanGestureHandler
                    onGestureEvent={(e) => handleGestureEvent(e, item.id)}
                  >
                    <View>
                      <View
                        style={[ProductStyles.card, GlobalStyles.boxShadow]}
                      >
                        <View style={ProductStyles.productTittle}>
                          <Text style={ProductStyles.tittleCard}>
                            {item.name} {item.packsize}
                          </Text>
                          <View style={ProductStyles.qty}>
                            <Text style={ProductStyles.textCard}>
                              Qty: {item.quantity} {item.uom}{' '}
                              {/*  Loaded:{' '}
                              {item.loaded || 0} */}
                            </Text>
                            {rightStates[item.id] ? (
                              <Text
                                style={[
                                  ProductStyles.textCard,
                                  {
                                    color:
                                      item.quantity - item.loaded > 0
                                        ? colors.danger
                                        : colors.green,
                                    marginRight: 50,
                                  },
                                ]}
                              >
                                {item.quantity - item.loaded > 0
                                  ? 'Missing -'
                                  : 'Overweight +'}{' '}
                                {Math.abs(item.quantity - item.loaded || 0)}
                              </Text>
                            ) : null}
                          </View>
                        </View>
                        <View
                          style={[
                            ProductStyles.checkBox,
                            {
                              backgroundColor: pressedStates[item.id]
                                ? colors.green
                                : rightStates[item.id]
                                  ? colors.green
                                  : leftStates[item.id]
                                    ? colors.danger
                                    : colors.gray,
                            },
                          ]}
                        >
                          <AntDesign
                            name={
                              pressedStates[item.id]
                                ? 'checkcircleo'
                                : rightStates[item.id]
                                  ? 'arrowright'
                                  : leftStates[item.id]
                                    ? 'closecircleo'
                                    : 'questioncircleo'
                            }
                            size={30}
                            color="white"
                          />
                        </View>
                      </View>
                      {addQuantity && selectedProduct === item.id ? (
                        <View
                          style={[
                            ProductStyles.details,
                            GlobalStyles.boxShadow,
                            { borderColor: colors.orange },
                          ]}
                        >
                          <View style={ProductStyles.information}>
                            <View>
                              <Text style={ProductStyles.textCard}>
                                Loaded:
                              </Text>
                              <Text
                                style={[
                                  ProductStyles.textCard,
                                  { marginTop: 12 },
                                ]}
                              >
                                Note:
                              </Text>
                            </View>
                            <View style={ProductStyles.inputsCard}>
                              <TextInput
                                style={ProductStyles.input}
                                keyboardType="numeric"
                                value={quantity}
                                onChangeText={(num) => setQuantity(num)}
                              />
                              <TextInput
                                style={[ProductStyles.input, { marginTop: 8 }]}
                              />
                            </View>
                          </View>
                          <TouchableOpacity
                            style={[
                              GlobalStyles.btnPrimary,
                              { width: 150, marginTop: 10, paddingVertical: 8 },
                            ]}
                            onPress={() => declareDifferentQty(item.id)}
                          >
                            <Text style={GlobalStyles.textBtnSecundary}>
                              Send
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  </PanGestureHandler>
                </TouchableOpacity>
                {showModal && selectedProduct === item.id ? (
                  <ModalProduct
                    showModal={showModal}
                    setShowModal={setShowModal}
                    declareNotAvailable={declareNotAvailable}
                    item={item}
                    title={'Item not available'}
                    text={
                      ' Are you sure you want to mark this item as unavailable?'
                    }
                  />
                ) : null}
              </View>
            ))}
          </View>
        ))}
        {/* <SectionList
          sections={loadingProducts}
          keyExtractor={(item, itemId) => `${itemId}`}
          renderItem={({ item }) => <ProductsCard item={item} />}
          renderSectionHeader={renderSeccionHeader}
          scrollEnabled
          />*/}
      </ScrollView>
    </SafeAreaView>
  )
}
export default ProductsLoading
