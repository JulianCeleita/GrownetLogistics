import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { useCardEvents } from '../hooks/useCardEvents'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'
import { CheckQuantity } from './CheckQuantity'
import { CheckStatusCard } from './CheckStatusCard'
import { Animated } from 'react-native'

export function ProductsCard({
  item,
  colorPress,
  colorRight,
  colorLeft,
  products,
  setProducts,
  handleSubmit,
  viewPacking,
  error,
  responsableDetails,
  userPacking,
  datePacking,
  userLoading,
  dateLoading,
  scrollToEnd,
}) {
  const positiveOffset = 30
  const negativeOffset = -30
  const [note, setNote] = useState('')
  const {
    quantity,
    setQuantity,
    showModal,
    setShowModal,
    addQuantity,
    selectedProduct,
    pressedStates,
    rightStates,
    leftStates,
    handlePress,
    handleGestureEvent,
    declareNotAvailable,
    declareDifferentQty,
    setAddQuantity,
    setSelectedProduct,
  } = useCardEvents(item.quantity, products, setProducts, error, viewPacking)
  const [fadeAnim] = useState(new Animated.Value(0))

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const [showModal2, setShowModal2] = useState(false)

  const isNA = item.state_definitive === 'N/A'

  const confirm = () => {
    declareNotAvailable(item.id)
    setShowModal(false)
    handleSubmit(item.id)
  }
  const confirm2 = () => {
    handlePress(item.id)
    setShowModal2(false)
    handleSubmit(item.id)
  }
  const quantityLoading = viewPacking
    ? quantity
    : item.quantity_packing
      ? item.quantity_packing
      : item.quantity

  const handleCardSubmit = async () => {
    const cardPromises = [
      handlePress(item.id),
      handleSubmit(item.id, quantityLoading, note),
    ]
    await Promise.allSettled(cardPromises)
  }

  const handleClose = () => {
    setAddQuantity(false)
    setSelectedProduct(null)
  }

  const handlePressAction = () => {
    if (item.state_definitive === 'N/A') {
      return () => {}
    }
    if (!viewPacking) {
      if (item.state_packing !== 'ND' && item.state_packing !== 'SHORT') {
        if (!leftStates[item.id] || rightStates[item.id]) {
          handlePress(item.id)
        }
        handleCardSubmit()
      }
    } else {
      if (!leftStates[item.id] || rightStates[item.id]) {
        handlePress(item.id)
      }
      handleCardSubmit()
    }
  }

  const handleGestureEventWrapper = (e) => {
    if (
      item.state_definitive === 'N/A' ||
      (viewPacking && item.state_loading !== null)
    ) {
      return () => {}
    } else {
      return handleGestureEvent(e, item.id)
    }
  }
  useEffect(() => {
    if (addQuantity && selectedProduct === item.id) {
      fadeIn()
      if (scrollToEnd) {
        console.log('entro aqui')
        scrollToEnd()
      }
    }
  }, [addQuantity, selectedProduct])

  return (
    <View
      style={{
        alignItems: 'center',
      }}
      key={item.id}
    >
      <TouchableOpacity
        onPress={handlePressAction}
        disabled={viewPacking && item.state_loading !== null}
      >
        <PanGestureHandler
          enabled={!addQuantity}
          onGestureEvent={handleGestureEventWrapper}
          activeOffsetX={[negativeOffset, positiveOffset]}
        >
          <View>
            <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
              <View style={ProductStyles.productTittle}>
                {item.uom != 'Ea' && item.uom != 'Kg' ? (
                  <Text
                    style={[
                      ProductStyles.tittleCard,
                      {
                        textDecorationLine: isNA ? 'line-through' : 'none',
                      },
                    ]}
                  >
                    {item.name} {item.uom}
                    <Text style={ProductStyles.packingText}>
                      {' - ' + item.presentationName}
                    </Text>
                  </Text>
                ) : (
                  <Text
                    style={[
                      ProductStyles.tittleCard,
                      {
                        textDecorationLine: isNA ? 'line-through' : 'none',
                      },
                    ]}
                  >
                    {item.name} - {item.uom}
                  </Text>
                )}
                {responsableDetails === false ? (
                  <View style={ProductStyles.qty}>
                    <Text style={ProductStyles.textCard}>
                      Qty: {item.quantity}
                    </Text>
                    {/* Componente para le manejo del Missing y el Overweight */}
                    <CheckQuantity
                      viewPacking={viewPacking}
                      quantity={item.quantity}
                      quantity_packing={item.quantity_packing}
                      quantity_loading={item.quantity_loading}
                      packed={item.packed}
                      stateLoading={item.state_loading}
                      statePacking={item.state_packing}
                    />
                  </View>
                ) : (
                  <View>
                    {userPacking === null && userLoading === null ? (
                      <Text style={[ProductStyles.textCard]}>Unchanged</Text>
                    ) : (
                      <View>
                        <Text
                          style={[
                            ProductStyles.textCard,
                            { fontSize: 12, marginTop: -2 },
                          ]}
                        >
                          {userPacking === null && userLoading != null
                            ? 'Packed by loader: ' + userLoading
                            : 'Packed by packer: ' + userPacking}
                        </Text>
                        <Text
                          style={[
                            ProductStyles.textCard,
                            { fontSize: 12, marginTop: -5 },
                          ]}
                        >
                          {userPacking === null && userLoading != null
                            ? dateLoading
                            : datePacking}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>

              <CheckStatusCard
                itemId={item.id}
                statePacking={item.state_packing}
                stateLoading={item.state_loading}
                viewPacking={viewPacking}
                pressedStates={pressedStates}
                rightStates={rightStates}
                leftStates={leftStates}
                colorPress={colorPress}
                colorRight={colorRight}
                colorLeft={colorLeft}
                quantity={item.quantity}
                quantity_packing={item.quantity_packing}
                quantity_loading={item.quantity_loading}
                packed={item.packed}
                isNA={isNA}
              />
            </View>

            {addQuantity && selectedProduct === item.id ? (
              <Animated.View
                style={{
                  ...ProductStyles.details,
                  ...GlobalStyles.boxShadow,
                  borderColor: colors.orange,
                  opacity: fadeAnim,
                }}
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
                      value={quantity?.toString()}
                      onChangeText={(num) => setQuantity(num)}
                    />
                    <TextInput
                      style={[ProductStyles.input, { marginTop: 8 }]}
                      value={note?.toString()}
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
                      console.log(typeof quantity, quantity)
                      if (addQuantity && selectedProduct === item.id) {
                        if (quantity === item.quantity) {
                          handlePress([item.id])
                          handleSubmit(item.id, quantity, note)
                        } else {
                          declareDifferentQty(item.id)
                          handleSubmit(item.id, quantity, note)
                        }
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
              </Animated.View>
            ) : null}
          </View>
        </PanGestureHandler>
      </TouchableOpacity>

      {showModal && selectedProduct === item.id ? (
        <ModalProduct
          showModal={showModal}
          setShowModal={setShowModal}
          confirm={confirm}
          title={item.name + ' not available'}
          text={' Are you sure you want to mark this item as unavailable?'}
        />
      ) : null}
      {showModal2 && selectedProduct === item.id ? (
        <ModalProduct
          showModal={showModal2}
          setShowModal={setShowModal2}
          confirm={confirm2}
          title={'Confirm ' + item.name}
          text={'Are you sure to confirm that all products have been packed?'}
        />
      ) : null}
    </View>
  )
}
