import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#026CD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  loginHeaderText: {
    color: '#ffffff',
    fontSize: Platform.OS === 'ios' ? 17 : 14,
    marginBottom: 20,
    fontFamily: 'PoppinsRegular',
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    fontFamily: 'PoppinsRegular',
    color: colors.darkBlue,
  },
  input2: {
    width: '50%',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#144D56',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 35,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
  span: {
    color: colors.lightGreen,
    fontFamily: 'PoppinsSemi',
  },
})
