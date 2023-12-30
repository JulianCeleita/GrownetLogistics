import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles, colors } from '../../Styles/GlobalStyles'
import { ProductStyles } from '../../Styles/ProductStyles'
import ProductSearcher from '../../components/ProductSearch'
import ProductsCard from '../../components/ProductsCard'
import { usePackingStore } from '../../store/usePackingStore'
import { View, Text, SectionList } from 'react-native'
import useTokenStore from '../../store/useTokenStore'
import { CustomerDayStyles } from '../../Styles/CustomerDayStyles'
import ModalProduct from '../../components/ModalProduct'

function ProductsPacking() {
  const [isPressed, setPressed] = useState(false)
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [showText, setShowText] = useState(false)
  const [search, setSearch] = useState(false)
  const [quantity, setQuantity] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // const { accountNumber } = route.params

  const { token } = useTokenStore()

  const { setProducts, packingProducts } = usePackingStore()

  const renderSeccionHeader = ({ item }) => (
    <View>
      <Text style={ProductStyles.category}>{item}</Text>
    </View>
  )

  useEffect(() => {
    // setProducts(token, 'SF004')
  }, [])

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
      setPressed(false)
      setShowModal(true)
    }
  }
  const handleSave = () => {
    setShowText(true)
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
        <Text style={ProductStyles.category}>1. Bulk</Text>
        <View style={{ alignItems: 'center' }}>
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
                      {showText ? (
                        <Text
                          style={[
                            ProductStyles.textCard,
                            { color: colors.danger, marginRight: 50 },
                          ]}
                        >
                          Missing 5
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View
                    style={[
                      ProductStyles.checkBox,
                      {
                        backgroundColor: isPressed
                          ? colors.orange
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
                          //value={quantity}
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
                      onPress={handleSave}
                    >
                      <Text style={GlobalStyles.textBtnSecundary}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </PanGestureHandler>
          </TouchableOpacity>
          {showModal ? (
            <ModalProduct
              showModal={showModal}
              setShowModal={setShowModal}
              setLeft={setLeft}
            />
          ) : null}
        </View>
        <SectionList
          sections={packingProducts}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => <ProductsCard item={item} />}
          renderSectionHeader={renderSeccionHeader}
          scrollEnabled
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsPacking
