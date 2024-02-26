import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { ModalStyle } from '../styles/ModalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'

const ModalDebugger = ({
    showModalDebugger,
    setShowModalDebugger,
    Title = '',
    message = '',
}) => {

    const closeModal = () => {
        setShowModalDebugger(false)
    }

    return (
        <Modal
            visible={showModalDebugger}
            animationType='slide'
        >
            <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center', marginTop: 50 }}>
                <View style={{ alignSelf: 'center' }}>
                    <MaterialIcons name="error-outline" size={45} color="#ee6055" />
                </View>
                <Text
                    style={[ModalStyle.modalTextTitle, { marginVertical: 10 }]}
                >
                    {Title}
                </Text>
                <ScrollView>
                    <View style={{ flex: 1, paddingVertical: 10 }} >
                        <Text style={CustomerDayStyles.modalText}>{message}</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={closeModal}
                    style={[GlobalStyles.btnPrimary, { marginTop: 10, marginBottom: 40 }]}
                >
                    <Text style={GlobalStyles.textBtnSecundary}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ModalDebugger;
