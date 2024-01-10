import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'

export const ProductsCardBulkVan = ({ item }) => {

    const [isPressed, setIsPressed] = useState(false)
    const [left, setLeft] = useState(false)

    const handlePress = () => {
        setIsPressed(!isPressed)
        setLeft(false)
    }
    const handleGestureEvent = (event) => {
        const { translationX } = event.nativeEvent
        if (translationX < 0) {
            console.log('Deslizamiento hacia la izquierda')
            setLeft(true)
            setIsPressed(false)
        }
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
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
    )
}
