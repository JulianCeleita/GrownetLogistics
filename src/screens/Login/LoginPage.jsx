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
import { login } from '../../config/urls.config'
import logo from '../../img/Logo_Blanco.png'
import useTokenStore from '../../store/useTokenStore'
import { LoginStyles } from '../../styles/LoginStyles'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showEmptyInputModal, setShowEmptyInputModal] = useState(false)
  const { setToken } = useTokenStore()
  const navigation = useNavigation()

  const handleSignIn = async () => {
    if (username === '' || password === '') {
      setShowEmptyInputModal(true)
      return
    }
    setLoading(true)
    const postData = {
      email: username,
      password: password,
    }
    mainAxios
      .post(login, postData)
      .then((response) => {
        if (response.data.status === 200) {
          setToken(response.data.token)
          setLoading(false)
          navigation.navigate('PinPage')
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
          <Text style={LoginStyles.loginHeaderText}>
            Welcome to <Text style={LoginStyles.span}>Grownet Logistics</Text>
          </Text>
          <TextInput
            style={LoginStyles.input}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={handleSignIn}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={LoginStyles.input}
            placeholder="Password"
            secureTextEntry
            onSubmitEditing={handleSignIn}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={
              loading
                ? LoginStyles.signInButtonDisabled
                : LoginStyles.signInButton
            }
            onPress={handleSignIn}
          >
            <Text style={LoginStyles.signInButtonText}>Log in</Text>
          </TouchableOpacity>
          <ModalAlert
            showModal={showModal}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title="We're sorry"
            message="Password or email are incorrect"
            message2="Try again"
          />
          <ModalAlert
            showModal={showEmptyInputModal}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title='We apologize'
            message='Password and email cannot be empty.'
            message2='Try again'
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginPage
