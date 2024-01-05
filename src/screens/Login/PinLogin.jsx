import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import mainAxios from '../../../axios.config'
import ModalAlert from '../../components/ModalAlert'
import { loginEmployee } from '../../config/urls.config'
import logo from '../../img/Logo_Blanco.png'
import useEmployeeStore from '../../store/useEmployeeStore'
import { LoginStyles } from '../../styles/LoginStyles'

const PinLogin = () => {
  const [pin, setPin] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showEmptyInputModal, setShowEmptyInputModal] = useState(false)
  const { setEmployeeToken } = useEmployeeStore()
  const navigation = useNavigation()

  const handleSignIn = () => {
    if (pin === '') {
      setShowEmptyInputModal(true)
      return
    }
    setLoading(true)
    const requestData = {
      pin: pin,
    }
    mainAxios
      .post(loginEmployee, requestData)
      .then((response) => {
        if (response.data.status === 200) {
          setEmployeeToken(response.data.token)
          setLoading(false)
          navigation.navigate('CustomDate')
        } else {
          setShowModal(true)
          setLoading(false)
        }
      })
      .catch((error) => {
        setShowModal(true)
        setLoading(false)
        console.error('Error:', error)
      })
  }
  const closeModal = () => {
    setShowModal(false)
    setShowEmptyInputModal(false)
  }
  const handleOutsidePress = () => {
    closeModal()
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={LoginStyles.container}>
          <StatusBar style="light" />
          <Image source={logo} style={LoginStyles.logo} />
          <Text style={LoginStyles.loginHeaderText}>Identify yourself</Text>
          <TextInput
            style={LoginStyles.input2}
            placeholder="Identifier pin"
            keyboardType="numeric"
            autoCapitalize="none"
            secureTextEntry
            onSubmitEditing={handleSignIn}
            onChangeText={(text) => setPin(text)}
          />
          <TouchableOpacity
            style={
              loading
                ? LoginStyles.signInButtonDisabled
                : LoginStyles.signInButton
            }
            onPress={handleSignIn}
          >
            <Text style={LoginStyles.signInButtonText}>Confirm</Text>
          </TouchableOpacity>
          <ModalAlert
            showModal={showModal}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title="We're sorry"
            message="Invalid credentials"
            message2="Try again"
          />
          <ModalAlert
            showModal={showEmptyInputModal}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title="We're sorry"
            message="Please enter your pin"
            message2="Try again"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default PinLogin
