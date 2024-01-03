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
import { LoginStyles } from '../../Styles/LoginStyles'
import logo from '../../img/Logo_Blanco.png'
import { useNavigation } from '@react-navigation/native'

const LoginPage = () => {
  const emailInputRef = useRef(null)
  const navigation = useNavigation()

  const handleSignIn = () => {
    // Lógica de inicio de sesión
    navigation.navigate('ConfirmationPage')
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
            Log in to Grownet Logistics
          </Text>
          <TextInput
            ref={emailInputRef}
            style={LoginStyles.input}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
          />
          <TextInput
            style={LoginStyles.input}
            placeholder="Password"
            secureTextEntry
            onSubmitEditing={handleSignIn}
          />
          <TouchableOpacity
            style={LoginStyles.signInButton}
            onPress={handleSignIn}
          >
            <Text style={LoginStyles.signInButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginPage
