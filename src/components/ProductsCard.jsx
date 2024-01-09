import { AntDesign } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { useCardEvents } from '../hooks/useCardEvents'
import { useProductSubmit } from '../hooks/useProductSubmit'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'

export function ProductsCard({
  item,
  colorPress,
  colorRight,
  colorLeft,
  products,
  setProducts,
  error,
}) {
  const positiveOffset = 30
  const negativeOffset = -30
  const [note, setNote] = useState('')
  const { handleSubmit } = useProductSubmit()
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
  const [isLoading, setIsLoading] = useState(false)
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

  return (
    <View style={{ alignItems: 'center' }} key={item.id}>
      <TouchableOpacity
        onPress={async () => {
          setIsLoading(true)
          if (leftStates[item.id] && !pressedStates[item.id]) {
            setShowModal2(true)
          }

          handlePress(item.id)
          await handleSubmit(item.id, quantity, note)
          setIsLoading(false)
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
                  {item.name} {item.packsize}
                </Text>
                <View style={ProductStyles.qty}>
                  <Text style={ProductStyles.textCard}>
                    Qty: {item.quantity}
                  </Text>

                  {rightStates[item.id] && item.quantity > item.packed ? (
                    <Text
                      style={[
                        ProductStyles.textCard,
                        { color: colors.danger, marginRight: 50 },
                      ]}
                    >
                      {`Missing ${item.quantity - item.packed || 0}`}
                    </Text>
                  ) : null}

                  {rightStates[item.id] && item.quantity < item.packed ? (
                    <Text
                      style={[
                        ProductStyles.textCard,
                        { color: colors.green, marginRight: 50 },
                      ]}
                    >
                      {`Overweight ${item.packed - item.quantity}`}
                    </Text>
                  ) : null}
                </View>
              </View>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={colors.bluePrimary}
                  style={{ marginRight: 15 }}
                />
              ) : (
                <View
                  style={[
                    ProductStyles.checkBox,
                    {
                      backgroundColor: pressedStates[item.id]
                        ? colorPress
                        : rightStates[item.id]
                          ? colorRight
                          : leftStates[item.id]
                            ? colorLeft
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
              )}
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
                    declareDifferentQty(item.id)
                    handleSubmit(item.id, quantity, note)
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
          declareNotAvailable={declareNotAvailable}
          item={item}
          confirm={confirm}
          title={item.name + ' not available'}
          text={' Are you sure you want to mark this item as unavailable?'}
        />
      ) : null}
      {showModal2 && selectedProduct === item.id ? (
        <ModalProduct
          showModal={showModal2}
          setShowModal={setShowModal2}
          declareNotAvailable={declareNotAvailable}
          confirm={confirm2}
          item={item}
          title={'Restore ' + item.name + ' status'}
          text={'Are you sure to restore the status?'}
        />
      ) : null}
    </View>
  )
}
