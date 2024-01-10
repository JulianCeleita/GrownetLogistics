import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'
import { useProductSubmit } from '../hooks/useProductSubmit'

export const ProductsCardBulkVan = ({ item }) => {

    const [isPressed, setIsPressed] = useState(false)
    const [left, setLeft] = useState(false)
    const { handleSubmit } = useProductSubmit()

    const handlePress = (itemId) => {
        setIsPressed(!isPressed)
        setLeft(false)
        handleSubmit(itemId)
    }

    const handleGestureEvent = (event, itemId) => {
        const { translationX } = event.nativeEvent
        if (translationX < 0) {
            setLeft(true)
            setIsPressed(false)
            handleSubmit(itemId)
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => handlePress(item.id)}>
                <PanGestureHandler onGestureEvent={(e) => handleGestureEvent(e, item.id)}>
                    <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
                        <View style={ProductStyles.productTittle}>
                            <Text
                                style={[
                                    ProductStyles.tittleCard,
                                    {
                                        textDecorationLine: left ? 'line-through' : 'none',
                                        color: left ? colors.bluePrimary : colors.darkBlue,
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                            <Text
                                style={[
                                    ProductStyles.textCard,
                                    {
                                        textDecorationLine: left ? 'line-through' : 'none',
                                        color: left,
                                    },
                                ]}
                            >
                                {`Missing ${item.quantity - item.quantity_packed} ${item.uom}`}
                            </Text>
                        </View>
                        <View
                            style={[
                                ProductStyles.checkBox,
                                {
                                    backgroundColor: isPressed
                                        ? colors.bluePrimary
                                        : left
                                            ? colors.bluePrimary
                                            : colors.gray,
                                },
                            ]}
                        >
                            <AntDesign
                                name={
                                    isPressed
                                        ? 'checkcircleo'
                                        : left
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
            {/* {showModal && selectedProduct === item.id ? (
                <ModalProduct
                    showModal={showModal}
                    setShowModal={setShowModal}
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
                    confirm={confirm2}
                    item={item}
                    title={'Confirm ' + item.name}
                    text={'Are you sure to confirm that all products have been packed?'}
                />
            ) : null} */}
        </View>
    )
}
