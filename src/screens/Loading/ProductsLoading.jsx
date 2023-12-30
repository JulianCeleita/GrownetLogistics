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
  const [isPressed, setPressed] = useState(false)
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [search, setSearch] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { Orders, setOrders } = useLoadingStore()

  const { token } = useTokenStore()
  console.log('Orders', Orders)
  console.log('token', token)

  const handlePress = () => {
    setPressed(!isPressed)
    setLeft(false)
    setRight(false)
  }
  const handleGestureEvent = (event) => {
    const { translationX } = event.nativeEvent
    if (translationX > 0) {
      console.log('Deslizamiento hacia la derecha')
      setRight(true)
      setLeft(false)
      setPressed(false)
    } else if (translationX < 0) {
      console.log('Deslizamiento hacia la izquierda')
      setRight(false)
      setShowModal(true)
      setPressed(false)
    }
  }
  const handleSearch = () => {
    setSearch(true)
  }
  const handleSave = () => {
    setPressed(true)
    setRight(false)
  }

  useEffect(() => {
    setOrders(token)
  }, [])
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
        <View>
          <Text style={ProductStyles.category}>Bulk</Text>
          <TouchableOpacity onPress={handlePress}>
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
              <View>
                <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
                  <View style={ProductStyles.productTittle}>
                    <Text style={ProductStyles.tittleCard}>
                      Banana x 18 kg - Box
                    </Text>
                    <View style={ProductStyles.qty}>
                      <Text style={ProductStyles.textCard}>Qty: 10</Text>
                      <Text
                        style={[
                          ProductStyles.textCard,
                          { color: colors.danger, marginRight: 50 },
                        ]}
                      >
                        Missing 5
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      ProductStyles.checkBox,
                      {
                        backgroundColor: isPressed
                          ? colors.green
                          : right
                            ? colors.orange
                            : left
                              ? colors.danger
                              : colors.gray,
                      },
                    ]}
                  >
                    <AntDesign
                      name={
                        isPressed
                          ? 'checkcircleo'
                          : right
                            ? 'arrowright'
                            : left
                              ? 'closecircleo'
                              : 'questioncircleo'
                      }
                      size={30}
                      color="white"
                    />
                  </View>
                </View>
                {right ? (
                  <View
                    style={[
                      ProductStyles.details,
                      GlobalStyles.boxShadow,
                      { borderColor: colors.orange },
                    ]}
                  >
                    <View style={ProductStyles.information}>
                      <View>
                        <Text style={ProductStyles.textCard}>Quantity:</Text>
                        <Text
                          style={[ProductStyles.textCard, { marginTop: 12 }]}
                        >
                          Notes:
                        </Text>
                      </View>
                      <View style={ProductStyles.inputsCard}>
                        <TextInput
                          style={ProductStyles.input}
                          keyboardType="numeric"
                        />
                        <TextInput
                          style={[ProductStyles.input, { marginTop: 8 }]}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={handleSave}
                      style={[
                        GlobalStyles.btnPrimary,
                        { width: 150, marginTop: 10, paddingVertical: 8 },
                      ]}
                    >
                      <Text style={GlobalStyles.textBtnSecundary}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </PanGestureHandler>
          </TouchableOpacity>
        </View>
        {showModal ? (
          <ModalProduct
            showModal={showModal}
            setShowModal={setShowModal}
            setLeft={setLeft}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsLoading
