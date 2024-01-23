import { AntDesign } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'
import { CheckStatusCardVan } from './CheckStatusCardVan'

export const ProductsCardBulkVan = ({ item, handleSubmit, viewBulk }) => {
  const [isPressed, setIsPressed] = useState(false)
  const [left, setLeft] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [right, setRight] = useState(false)
  const [quantity, setQuantity] = useState(null)
  const [note, setNote] = useState('')
  const [modalCard, setModalCard] = useState(false)
  const [showModalNA, setShowModalNA] = useState(false)
  const [isNA, setIsNA] = useState(false)

  const positiveOffset = 30
  const negativeOffset = -30

  const handlePress = (itemId) => {
    setIsPressed(!isPressed)
    setLeft(false)
    setRight(false)
    handleClose(false)
    setIsNA(false)
    handleSubmit(itemId, null, '', 'FULL')
  }

  const handleDeclareNA = () => {
    setShowModalNA(true)
  }

  const handleGestureEvent = (event, itemId) => {
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
    handleSubmit(item.id, 0, '', 'SHORT')
  }

  const confirmNA = () => {
    setShowModalNA(false)
    setIsNA(true)
    handleSubmit(item.id, 0, '', 'N/A')
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
    if (item.state_definitive === "N/A") {
      setIsNA(true)
    }
  }, [])

  if (viewBulk) {
    return (
      <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
        <View style={ProductStyles.productTittle}>
          <Text
            style={{
              ...ProductStyles.tittleCard,
              flex: 1,
              alignContent: 'center',
            }}
          >
            {item.name} {item.presentationName} 
          </Text>
          <Text style={ProductStyles.textCard}>
            {`Missing ${item.quantity - item.cant_insert}`}
          </Text>
        </View>
        <View
          style={[
            ProductStyles.checkBox,
            { backgroundColor: colors.bluePrimary },
          ]}
        >
          <AntDesign name={'questioncircleo'} size={30} color="white" />
        </View>
      </View>
    )
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePress(item.id)}
        onLongPress={() => handleDeclareNA()}
        delayLongPress={2000}
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
                {item.name} {item.presentationName} 
                {console.log(item)}
              </Text>

              <View style={ProductStyles.qty}>
                <Text style={ProductStyles.textCard}>Qty: {item.quantity}</Text>
                <Text
                  style={[
                    ProductStyles.textCard,
                    {
                      marginRight: 25,
                      color: colors.danger,
                      textDecorationLine: isNA ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {quantity
                    ? `Missing ${item.quantity - item.cant_insert}`
                    : !quantity && item.quantity_defitive
                      ? `Missing ${item.quantity - item.quantity_defitive}`
                      : `Missing ${item.quantity - item.cant_insert}`}
                </Text>
              </View>
            </View>

            <CheckStatusCardVan
              item={item}
              isPressed={isPressed}
              right={right}
              left={left}
              isNA={isNA}
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
                setQuantity(null)
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
                  handleSubmit(item.id, quantity, note)
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
