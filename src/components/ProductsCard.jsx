import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'


import mainAxios from '../../axios.Config'
import ModalProduct from '../components/ModalProduct'
import { insertPacking } from '../config/urls.config'
import { usePackingStore } from '../store/usePackingStore'
import useTokenStore from '../store/useTokenStore'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'

function Products({ item }) {
  const { token } = useTokenStore()

  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [addQuantity, setAddQuantity] = useState(false)
  const [pressedStates, setPressedStates] = useState({})
  const [rightStates, setRightStates] = useState({})
  const [leftStates, setLeftStates] = useState({})
  const [quantity, setQuantity] = useState(0)
  const { packingProducts, setPackingProducts } = usePackingStore()
  const [note, setNote] = useState('')

  const handlePress = (itemId) => {
    setSelectedProduct(itemId)
    handleSubmit(itemId)
    const newPressedStates = Object.assign({}, pressedStates)
    const newRightStates = { ...rightStates }
    const newLeftStates = { ...leftStates }

    newPressedStates[itemId] = !newPressedStates[itemId]
    newRightStates[itemId] = false
    newLeftStates[itemId] = false

    const updatedProducts = packingProducts.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            packed: newPressedStates[itemId] ? item.quantity : '',
          }
        }
        return item
      }),
    }))
    setPressedStates(newPressedStates)
    setRightStates(newRightStates)
    setLeftStates(newLeftStates)
    setPackingProducts(updatedProducts)
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
      console.log('Dezlizamos a la izquierda')
    }
  }

  const declareNotAvailable = (itemId) => {
    const newLeftStates = Object.assign({}, leftStates)
    const newPressedStates = { ...pressedStates }
    const newRightStates = { ...rightStates }

    newLeftStates[itemId] = !newLeftStates[itemId]
    newPressedStates[itemId] = false
    newRightStates[itemId] = false

    const updatedProducts = packingProducts.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: newLeftStates[itemId] ? 0 : '' }
        }
        return item
      }),
    }))

    setLeftStates(newLeftStates)
    setPressedStates(newPressedStates)
    setRightStates(newRightStates)
    setPackingProducts(updatedProducts)
    setAddQuantity(false)

    console.log('Dezlizamos a la izquierda', itemId)
  }

  const declareDifferentQty = (itemId) => {
    const newRightStates = Object.assign({}, rightStates)
    newRightStates[itemId] = true

    const updatedProducts = packingProducts.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: newRightStates[itemId] ? quantity : '' }
        }
        return item
      }),
    }))
    setRightStates(newRightStates)
    setPackingProducts(updatedProducts)
    setSelectedProduct(null)
    setAddQuantity(false)
  }

  const handleSubmit = async (itemId) => {

    if (quantity === 0) {
      setQuantity(item.quantity)
    }

    const data = {
      note,
      quantity: parseInt(quantity, 10),
      id: itemId,
    }

    console.log('data', data)

    // try {
    //   const response = await mainAxios.post(insertLoading, data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })

    //   if (response.status === 200) {
    //     console.log('Datos enviados correctamente', response.data)
    //   } else {
    //     throw new Error('Error al enviar los datos')
    //   }
    // } catch (error) {
    //   console.error('Hubo un error al enviar los datos: ', error)
    // }
  }

  return (
    <View style={{ alignItems: 'center' }} key={item.id}>
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <PanGestureHandler
          onGestureEvent={(e) => handleGestureEvent(e, item.id)}
        >
          <View>
            <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
              <View style={ProductStyles.productTittle}>
                <Text style={ProductStyles.tittleCard}>
                  {item.name} {item.packsize}
                </Text>
                <View style={ProductStyles.qty}>
                  <Text style={ProductStyles.textCard}>
                    Qty: {item.quantity}
                  </Text>
                  {rightStates[item.id] ? (
                    <Text
                      style={[
                        ProductStyles.textCard,
                        { color: colors.danger, marginRight: 50 },
                      ]}
                    >
                      {`Missing ${item.quantity - item.packed || 0}`}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View
                style={[
                  ProductStyles.checkBox,
                  {
                    backgroundColor: pressedStates[item.id]
                      ? colors.orange
                      : rightStates[item.id]
                        ? colors.orange
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
                    <Text style={ProductStyles.textCard}>Packed:</Text>
                    <Text style={[ProductStyles.textCard, { marginTop: 12 }]}>
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
                      value={note}
                      onChangeText={(note) => setNote(note)}
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
                  <Text style={GlobalStyles.textBtnSecundary}>Send</Text>
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
          text={' Are you sure you want to mark this item as unavailable?'}
        />
      ) : null}
    </View>
  )
}

export default Products
