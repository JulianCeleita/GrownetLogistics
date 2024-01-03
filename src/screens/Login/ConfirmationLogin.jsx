import React, { useRef } from 'react'
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

const ConfirmationLogin = () => {
  const identifierInputRef = useRef(null)
  const navigation = useNavigation()

  const handleSignIn = () => {
    // Lógica de confirmación de identificación
    navigation.navigate('PackingScreen')
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
            ref={identifierInputRef}
            style={LoginStyles.input}
            placeholder="Identifier code"
            keyboardType="default"
            autoCapitalize="none"
            onSubmitEditing={handleSignIn}
          />
          <TouchableOpacity
            style={LoginStyles.signInButton}
            onPress={() => {
              if (identifierInputRef.current) {
                identifierInputRef.current.focus()
              }
              handleSignIn()
            }}
          >
            <Text style={LoginStyles.signInButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ConfirmationLogin
