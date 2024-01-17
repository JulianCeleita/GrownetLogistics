import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { useCardEvents } from '../hooks/useCardEvents'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'
import { CheckQuantity } from './CheckQuantity'
import { CheckStatusCard } from './CheckStatusCard'

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
  } = useCardEvents(item.quantity, products, setProducts, error)

  const [showModal2, setShowModal2] = useState(false)

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

  const handleCardSubmit = async () => {
    const cardPromises = [
      handlePress(item.id),
      handleSubmit(item.id, quantity, note),
    ]
    await Promise.allSettled(cardPromises)
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}
      key={item.id}
    >
      <TouchableOpacity
        onPress={() => {
          if (!leftStates[item.id] || rightStates[item.id]) {
            handlePress(item.id)
          } else {
            setShowModal2(true)
          }

          handleCardSubmit()
        }}
      >
        <PanGestureHandler
          enabled={!addQuantity}
          onGestureEvent={(e) => handleGestureEvent(e, item.id)}
          activeOffsetX={[negativeOffset, positiveOffset]}
        >
          <View>
            <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
              <View style={ProductStyles.productTittle}>
                <Text style={ProductStyles.tittleCard}>
                  {item.name} {item.presentationName}
                </Text>
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
                  />
                </View>
              </View>

              <CheckStatusCard
                itemId={item.id}
                statePacking={item.state_packing}
                pressedStates={pressedStates}
                rightStates={rightStates}
                leftStates={leftStates}
                colorPress={colorPress}
                colorRight={colorRight}
                colorLeft={colorLeft}
              />
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
                <TouchableOpacity
                  style={[
                    GlobalStyles.btnPrimary,
                    { width: 150, marginTop: 10, paddingVertical: 8 },
                  ]}
                  onPress={() => {
                    if (addQuantity && selectedProduct === item.id) {
                      if (parseInt(quantity) === item.quantity) {
                        handlePress([item.id])
                        handleSubmit(item.id, quantity, note)
                      } else {
                        declareDifferentQty(item.id)
                        handleSubmit(item.id, quantity, note)
                      }
                    }
                  }}
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
