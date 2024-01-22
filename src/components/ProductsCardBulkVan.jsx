import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'

export const ProductsCardBulkVan = ({ item, handleSubmit, viewBulk }) => {
  const [isPressed, setIsPressed] = useState(false)
  const [left, setLeft] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [right, setRight] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity)
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
    handleSubmit(itemId, null, '', 'FULL')
  }

  const handleDeclareNA = () => {
    console.log('declareNA')
    setShowModalNA(true)
  }

  const handleGestureEvent = (event, itemId) => {
    setSelectedItem(itemId)
    const { translationX } = event.nativeEvent
    if (translationX < 0) {
      setLeft(true)
      setRight(false)
      setIsPressed(false)
      setShowModal(true)
    }

    if (translationX > 0) {
      setModalCard(true)
    }
  }

  const confirm = () => {
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
            {item.name}
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
                {item.name}
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
                  {`Missing ${item.quantity - item.cant_insert}`}
                </Text>
              </View>
            </View>
            <View
              style={[
                ProductStyles.checkBox,
                {
                  backgroundColor:
                    isPressed || right || item.last_state === 'FULL'
                      ? colors.bluePrimary
                      : left || item.last_state === 'SHORT' || isNA
                        ? colors.danger
                        : colors.gray,
                },
              ]}
            >
              <AntDesign
                name={
                  isPressed || right || item.last_state === 'FULL'
                    ? 'checkcircleo'
                    : left || item.last_state === 'SHORT' || isNA
                      ? 'minuscircleo'
                      : 'questioncircleo'
                }
                size={30}
                color="white"
              />
            </View>
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
                value={quantity.toString()}
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
              onPress={handleClose}
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
                handleSubmit(item.id, quantity, note)
                setLeft(false)
                setIsPressed(false)
                setRight(true)
                handleClose()
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
