import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import { ModalStyle } from '../styles/ModalStyles'
import { MaterialIcons } from '@expo/vector-icons'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useProductSubmit } from '../hooks/useProductSubmit'

const ModalProduct = ({
  showModal,
  setShowModal,
  declareNotAvailable,
  item,

  title,
  text,
}) => {

  const { handleSubmit } = useProductSubmit()

  const confirm = () => {
    declareNotAvailable(item.id)
    setShowModal(false)
    handleSubmit(item.id)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={''}
    >
      <TouchableWithoutFeedback>
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.centeredView}>
            <View style={ModalStyle.modalView}>
              <MaterialIcons name="error-outline" size={45} color="#ee6055" />
              <Text style={ModalStyle.modalTextTitle}>{title}</Text>
              <Text style={ModalStyle.modalText}>{text}</Text>
              <View style={[ModalStyle.buttons, { marginTop: 10 }]}>
                <TouchableOpacity
                  onPress={confirm}
                  style={[GlobalStyles.btnPrimary, ModalStyle.space]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClose}
                  style={GlobalStyles.btnOutline}
                >
                  <Text style={GlobalStyles.textBtnOutline}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalProduct
