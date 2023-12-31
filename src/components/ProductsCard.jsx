import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'
import mainAxios from '../../axios.Config'
import { insertLoading } from '../config/urls.config'
import useTokenStore from '../store/useTokenStore'

function Products({ item }) {
  const [isPressed, setIsPressed] = useState(false)
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [quantityLeft, setQuantityLeft] = useState('')
  const [quantityRight, setQuantityRight] = useState('')
  const [notesLeft, setNotesLeft] = useState('')
  const [notesRight, setNotesRight] = useState('')
  const { token } = useTokenStore()

  const handlePress = () => {
    setIsPressed(!isPressed)
    setLeft(false)
    setRight(false)
  }
  const handleGestureEvent = (event) => {
    const { translationX } = event.nativeEvent
    if (translationX > 0) {
      setRight(true)
      setLeft(false)
      setIsPressed(false)
    } else if (translationX < 0) {
      setRight(false)
      setLeft(true)
      setIsPressed(false)
    }
  }

  const handleSubmit = async () => {
    let quantity
    let notes

    if (left) {
      quantity = quantityLeft
      notes = notesLeft
    } else if (right) {
      quantity = quantityRight
      notes = notesRight
    }

    const data = {
      quantity: parseInt(quantity, 10),
      id: parseInt(notes, 10),
    }
    console.log('data', data)
    try {
      const response = await mainAxios.post(insertLoading, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        console.log('Datos enviados correctamente', response.data)
      } else {
        throw new Error('Error al enviar los datos')
      }
    } catch (error) {
      console.error('Hubo un error al enviar los datos: ', error)
    }
  }
  console.log('derecha', quantityRight, notesRight)
  return (
    <View>
      {/* <Text style={ProductStyles.category}>Bulk</Text> */}
      <TouchableOpacity onPress={handlePress}>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <View>
            <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
              <View style={ProductStyles.productTittle}>
                <Text style={ProductStyles.tittleCard}>{item.name}</Text>
                <Text
                  style={ProductStyles.textCard}
                >{`${item.packsize} - ${item.uom}`}</Text>
              </View>
              <View
                style={[
                  ProductStyles.checkBox,
                  {
                    backgroundColor: isPressed
                      ? colors.green
                      : right
                        ? colors.danger
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
            {left ? (
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
                    <Text style={[ProductStyles.textCard, { marginTop: 12 }]}>
                      Notes:
                    </Text>
                  </View>
                  <View style={ProductStyles.inputsCard}>
                    <TextInput
                      style={ProductStyles.input}
                      keyboardType="numeric"
                      value={quantityLeft}
                      onChangeText={(num) => setQuantityLeft(num)}
                    />
                    <TextInput
                      style={[ProductStyles.input, { marginTop: 8 }]}
                      value={notesLeft}
                      onChangeText={(text) => setNotesLeft(text)}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    GlobalStyles.btnPrimary,
                    { width: 150, marginTop: 10 },
                  ]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {right ? (
              <View
                style={[
                  ProductStyles.details,
                  GlobalStyles.boxShadow,
                  { borderColor: colors.danger },
                ]}
              >
                <View style={ProductStyles.information}>
                  <View>
                    <Text style={ProductStyles.textCard}>Quantity:</Text>
                    <Text style={[ProductStyles.textCard, { marginTop: 12 }]}>
                      Notes:
                    </Text>
                  </View>
                  <View style={ProductStyles.inputsCard}>
                    <TextInput
                      style={ProductStyles.input}
                      keyboardType="numeric"
                      value={quantityRight}
                      onChangeText={(num) => setQuantityRight(num)}
                    />
                    <TextInput
                      style={[ProductStyles.input, { marginTop: 8 }]}
                      value={notesRight}
                      onChangeText={(text) => setNotesRight(text)}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    GlobalStyles.btnPrimary,
                    { width: 150, marginTop: 10 },
                  ]}
                  onPress={handleSubmit}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </PanGestureHandler>
      </TouchableOpacity>
    </View>
  )
}

export default Products
