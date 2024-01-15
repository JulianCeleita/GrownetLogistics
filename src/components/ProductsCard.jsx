import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { useCardEvents } from '../hooks/useCardEvents'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'

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
  const [tempIsPressed, setTempIsPressed] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const validateState = viewPacking ? item.state_packing : item.state_loading;
  const compareQuantity = viewPacking ? item.quantity_packing : item.quantity_loading;

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

  console.log('--------------------------');
  console.log('name: ', item.name);
  console.log('item.quantity: ', item.quantity);
  console.log('item.quantity_packing: ', item.quantity_packing);
  console.log('item.quantity_loading: ', item.quantity_loading);
  console.log('item.state_packing: ', item.state_packing);
  console.log('item.state_loading: ', item.state_loading);

  return (
    <View
      style={{
        alignItems: 'center',
      }}
      key={item.id}
    >
      <TouchableOpacity
        onPress={() => {
          setTempIsPressed(true)
          if (pressedStates[item.id]) {
            setIsPressed(true)
          }

          if (!leftStates[item.id] || rightStates[item.id]) {
            setTimeout(() => {
              handlePress(item.id)
            }, 3000)
          } else {
            setShowModal2(true)
          }
          setTimeout(() => {
            handleSubmit(item.id, quantity, note)
            setTempIsPressed(false)
            if (pressedStates[item.id]) {
              setIsPressed(false)
            }
          }, 3000)
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

                  {item.quantity > compareQuantity ||
                    item.quantity > item.packed ? (
                    <Text
                      style={[
                        ProductStyles.textCard,
                        { color: colors.danger, marginRight: 50 },
                      ]}
                    >
                      {`Missing ${item.quantity - compareQuantity}`}
                    </Text>
                  ) : null}

                  {item.quantity < compareQuantity ||
                    item.quantity < item.packed ? (
                    <Text
                      style={[
                        ProductStyles.textCard,
                        { color: colors.green, marginRight: 50 },
                      ]}
                    >
                      {`Overweight ${compareQuantity - item.quantity}`}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View
                style={[
                  ProductStyles.checkBox,
                  {
                    backgroundColor: isPressed
                      ? colors.gray
                      : tempIsPressed
                        ? colorPress
                        : pressedStates[item.id] ||
                          validateState === "FULL" ||
                          validateState === "FULL"
                          ? colorPress
                          : rightStates[item.id] ||
                            validateState === "ND" ||
                            validateState === "ND"
                            ? colorRight
                            : leftStates[item.id] ||
                              validateState === "SHORT" ||
                              validateState === "SHORT"
                              ? colorLeft
                              : colors.gray,
                  },
                ]}
              >
                <AntDesign
                  name={
                    isPressed || (addQuantity && quantity === item.quantity)
                      ? 'questioncircleo'
                      : tempIsPressed ||
                        (addQuantity && quantity === item.quantity)
                        ? 'checkcircleo'
                        : pressedStates[item.id] ||
                          (addQuantity && quantity === item.quantity) ||
                          validateState === "FULL" ||
                          validateState === "FULL"
                          ? 'checkcircleo'
                          : rightStates[item.id] ||
                            validateState === "ND" ||
                            validateState === "ND"
                            ? 'arrowright'
                            : leftStates[item.id] ||
                              validateState === "SHORT" ||
                              validateState === "SHORT"
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
