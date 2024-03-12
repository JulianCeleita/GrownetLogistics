import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

export const BtnGoBack = ({ color, top = 10, left = 10, toDate = false }) => {
    const { goBack, navigate } = useNavigation()
    return (
        <View style={{ position: 'absolute', zIndex: 100, top: top, left: left }}>
            <Feather
                name="arrow-left"
                size={27}
                color={color}
                onPress={() => !toDate ? goBack() : navigate('CustomDate')}
            />
        </View>
    )
}
