import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ModalProduct from '../components/ModalProduct'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'

export const ProductsCardBulkVan = ({ item, handleSubmit }) => {

    const [isPressed, setIsPressed] = useState(false)
    const [left, setLeft] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)


    const handlePress = (itemId) => {
        setIsPressed(!isPressed)
        setLeft(false)
        handleSubmit(itemId, item.quantity - item.quantity_packed)
    }

    const handleGestureEvent = (event, itemId) => {
        setSelectedItem(itemId)
        const { translationX } = event.nativeEvent
        if (translationX < 0) {
            setLeft(true)
            setIsPressed(false)
            setShowModal(true)
        }
    }

    const confirm = () => {
        setShowModal(false)
        handleSubmit(item.id)
    }

    const setStateCardDefault = () => {
        setIsPressed(false)
        setLeft(false)
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
