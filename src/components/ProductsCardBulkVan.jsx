import { AntDesign } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'
import { CheckStatusCardVan } from './CheckStatusCardVan'

export const ProductsCardBulkVan = ({
  item,
  handleSubmit,
  updateProductsVan,
  viewBulk,
  responsableDetails,
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [left, setLeft] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [right, setRight] = useState(false)
  const [quantity, setQuantity] = useState(null)
  const [note, setNote] = useState('')
  const [modalCard, setModalCard] = useState(false)
  const [showModalNA, setShowModalNA] = useState(false)
  const [showModalRevertNA, setShowModalRevertNA] = useState(false)
  const [isNA, setIsNA] = useState(false)

  const positiveOffset = 30
  const negativeOffset = -30
  const quantityPressed = (item.quantity - item.cant_insert).toFixed(1)

  const handlePress = (itemId) => {
    if (isNA) {
      return
    }
    setIsPressed(!isPressed)
    setLeft(false)
    setRight(false)
    handleClose(false)
    setIsNA(false)
    updateProductsVan(itemId, quantityPressed)
    handleSubmit(itemId, quantityPressed, '', 'FULL')
  }

  const handleDeclareNA = () => {
    setShowModalNA(true)
  }
  const handleRevertNA = () => {
    setShowModalRevertNA(true)
  }

  const handleGestureEvent = (event, itemId) => {
    if (isNA) {
      return
    }
    setSelectedItem(itemId)
    const { translationX } = event.nativeEvent
    if (translationX < 0) {
      setShowModal(true)
    }

    if (translationX > 0) {
      setModalCard(true)
    }
  }

  const confirm = () => {
    setLeft(true)
    setRight(false)
    setIsPressed(false)
    setIsNA(false)
    setShowModal(false)
    updateProductsVan(item.id)
    handleSubmit(item.id, 0, '', 'SHORT')
  }

  const confirmNA = () => {
    setShowModalNA(false)
    updateProductsVan(item.id, null, 'N/A')
    handleSubmit(item.id, 0, '', 'N/A')
  }

  const confirmRevertNA = () => {
    setShowModalRevertNA(false)
    setIsNA(false)
    handleSubmit(item.id, 0, '', 'null')
  }

  const setStateCardDefault = () => {
    setIsPressed(false)
    setLeft(false)
    setModalCard(false)
  }

  const handleClose = () => {
    setModalCard(false)
  }

  useEffect(() => {
    if (item.state_definitive === 'N/A') {
      setIsNA(true)
    }
  }, [])

  const isDecimal = (num) => {
    num = Number(num)
    if (num % 1 !== 0) {
      return num.toFixed(1)
    }
    return num
  }

  if (viewBulk) {
    return (
      <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
        <View style={ProductStyles.productTittle}>
          <Text
            style={[
              ProductStyles.tittleCard,
              {
                color: colors.darkBlue,
                textDecorationLine: isNA ? 'line-through' : 'none',
              },
            ]}
          >
            {item.name} - {item.uom}
          </Text>
          <Text style={ProductStyles.textCard}>
            {`Missing ${isDecimal(item.quantity - item.cant_insert)}`}
          </Text>
        </View>
        <View
          style={[
            ProductStyles.checkBox,
            { backgroundColor: colors.bluePrimary },
          ]}
        >
          {isNA ? (
            <View>
              <Text style={ProductStyles.textNA}>N/A</Text>
            </View>
          ) : (
            <AntDesign name={'questioncircleo'} size={30} color="white" />
          )}
        </View>
      </View>
    )
  }

  let message = `M: ${item.quantity - item.cant_insert}`
  let missingStatus = false
  let overStatus = false
  let checkStatus = false
  let colorStatus = colors.danger

  if (
    item.quantity - item.cant_insert === item.packed ||
    item.quantity - item.cant_insert === item.quantity_defitive
  ) {
    message = `M: ${isDecimal(item.quantity - item.cant_insert)}`
    checkStatus = true
    colorStatus = colors.danger
  }

  if (
    !item.packed &&
    !item.quantity_defitive &&
    item.quantity > item.cant_insert
  ) {
    message = `M: ${isDecimal(item.quantity - item.cant_insert)}`
    missingStatus = true
    colorStatus = colors.danger
  }

  if (
    !item.packed &&
    !item.quantity_defitive &&
    item.quantity < item.cant_insert
  ) {
    message = `O: ${isDecimal(item.cant_insert - item.quantity)}`
    overStatus = true
    colorStatus = colors.green
  }

  if (
    !item.packed &&
    item.quantity_defitive &&
    item.quantity_defitive + item.cant_insert < item.quantity
  ) {
    message = `M: ${isDecimal(item.quantity - (item.quantity_defitive + item.cant_insert))}`
    missingStatus = true
    colorStatus = colors.danger
  }

  if (
    !item.packed &&
    item.quantity_defitive &&
    item.quantity_defitive + item.cant_insert > item.quantity
  ) {
    message = `O: ${isDecimal(item.quantity_defitive + item.cant_insert - item.quantity)}`
    overStatus = true
    colorStatus = colors.green
  }

  if (
    item.packed &&
    item.cant_insert > 0 &&
    item.quantity - item.cant_insert > item.packed
  ) {
    message = `M: ${isDecimal(item.quantity - item.cant_insert - item.packed)}`
    missingStatus = true
    colorStatus = colors.danger
  }

  if (
    item.packed &&
    item.cant_insert > 0 &&
    item.quantity - item.cant_insert < item.packed
  ) {
    message = `O: ${isDecimal(item.packed - (item.quantity - item.cant_insert))}`
    overStatus = true
    colorStatus = colors.green
  }

  if (
    item.packed &&
    item.cant_insert <= 0 &&
    item.quantity - item.cant_insert > item.packed
  ) {
    message = `M: ${isDecimal(item.quantity - item.cant_insert - item.packed)}`
    missingStatus = true
    colorStatus = colors.danger
  }

  if (
    item.packed &&
    item.cant_insert <= 0 &&
    item.quantity - item.cant_insert < item.packed
  ) {
    message = `O: ${isDecimal(item.packed - (item.quantity - item.cant_insert))}`
    overStatus = true
    colorStatus = colors.green
  }

  return (
    <View style={{ alignSelf: 'center' }}>
      <TouchableOpacity
        onPress={() => handlePress(item.id)}
        onLongPress={() => (isNA ? handleRevertNA() : handleDeclareNA())}
        delayLongPress={1000}
      >
        <PanGestureHandler
          onGestureEvent={(e) => handleGestureEvent(e, item.id)}
          activeOffsetX={[negativeOffset, positiveOffset]}
        >
          <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
            <View style={ProductStyles.productTittle}>
              <Text
                style={[
                  ProductStyles.tittleCard,
                  {
                    color: colors.darkBlue,
                    textDecorationLine: isNA ? 'line-through' : 'none',
                  },
                ]}
              >
                {item.name} - {item.uom}
              </Text>
              {responsableDetails === false ? (
                <View style={ProductStyles.qty}>
                  <Text style={ProductStyles.textCard}>
                    Qty: {isDecimal(item.quantity)}
                    {item.cant_insert && Number(item.cant_insert) > 0 ? (
                      <Text>
                        {' '}
                        -{' L: '}
                        {isDecimal(item.cant_insert)}
                      </Text>
                    ) : null}
                    {message ? (
                      <>
                        <Text> - </Text>
                        <Text style={{ color: colorStatus }}>{message}</Text>
                      </>
                    ) : null}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={[ProductStyles.textCard, { fontSize: 12 }]}>
                    Last: Paula Vanegas
                  </Text>
                  <Text style={[ProductStyles.textCard, { fontSize: 12 }]}>
                    20:00 AM
                  </Text>
                </View>
              )}
            </View>

            <CheckStatusCardVan
              item={item}
              isPressed={isPressed}
              right={right}
              left={left}
              isNA={isNA}
              missingStatus={missingStatus}
              overStatus={overStatus}
              checkStatus={checkStatus}
            />
          </View>
        </PanGestureHandler>
      </TouchableOpacity>
      {modalCard ? (
        <View
          style={[
            ProductStyles.details,
            GlobalStyles.boxShadow,
            { borderColor: colors.bluePrimary },
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
                value={quantity && quantity.toString()}
                onChangeText={(num) => setQuantity(num)}
              />
              <TextInput
                style={[ProductStyles.input, { marginTop: 8 }]}
                value={note.toString()}
                onChangeText={(note) => setNote(note)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleClose()
              }}
              style={{
                ...GlobalStyles.btnOutline,
              }}
            >
              <Text
                style={[
                  GlobalStyles.textBtnOutline,
                  { fontSize: Platform.OS === 'ios' ? 15 : 14 },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[GlobalStyles.btnPrimary]}
              onPress={() => {
                if (quantity && Number(quantity) > 0) {
                  updateProductsVan(item.id, quantity)
                  handleSubmit(item.id, quantity, note, '')
                  setLeft(false)
                  setIsPressed(false)
                  setRight(true)
                  setIsNA(false)
                  handleClose()
                }
              }}
            >
              <Text
                style={[
                  GlobalStyles.textBtnSecundary,
                  { fontSize: Platform.OS === 'ios' ? 15 : 14 },
                ]}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {showModalNA ? (
        <ModalProduct
          showModal={showModalNA}
          setShowModal={setShowModalNA}
          confirm={confirmNA}
          setStateCardDefault={setStateCardDefault}
          title={item.name + ' will be marked as N/A'}
          text={' Are you sure you want to mark this item as N/A?'}
        />
      ) : null}
      {showModalRevertNA ? (
        <ModalProduct
          showModal={showModalRevertNA}
          setShowModal={setShowModalRevertNA}
          confirm={confirmRevertNA}
          setStateCardDefault={setStateCardDefault}
          title={item.name + ' will enable the product'}
          text={' Are you sure you enable this article?'}
        />
      ) : null}

      {showModal && selectedItem === item.id ? (
        <ModalProduct
          showModal={showModal}
          setShowModal={setShowModal}
          confirm={confirm}
          setStateCardDefault={setStateCardDefault}
          title={item.name + ' not available'}
          text={' Are you sure you want to mark this item as unavailable?'}
        />
      ) : null}
    </View>
  )
}
