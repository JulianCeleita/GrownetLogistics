import React, { useRef, useState } from 'react'
import {
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { LoginStyles } from '../../styles/LoginStyles'
import logo from '../../img/Logo_Blanco.png'
import { useNavigation } from '@react-navigation/native'
import useTokenStore from '../../store/useTokenStore'
import mainAxios from '../../../axios.config.js'
import { login } from '../../config/urls.config'
import ModalAlert from '../../components/ModalAlert'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // TODO PONER EL MODAL DE ERROR
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  // TODO PONER EL MODAL DE EMPTY
  const [showEmptyInputModal, setShowEmptyInputModal] = useState(false)
  const { token, setToken } = useTokenStore()
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
          //navigation.navigate('ConfirmationPage')
          console.log('Respuesta', response.data)
          console.log('Estamos logueados men')
        }
      })
      .catch((error) => {
        setShowModal(true)
        setLoading(false)
        console.log('El error es', error)
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
            onSubmitEditing={() => {}}
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
            Title={'We apologize'}
            message={'Please check your email and password and try again.'}
            message2={'Try again'}
          />
          <ModalAlert
            showModal={showEmptyInputModal}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title={'We apologize'}
            message={'Password and email cannot be empty.'}
            message2={'Try again'}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginPage
