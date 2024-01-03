import { StyleSheet } from 'react-native'

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
    marginBottom: 30,
    fontFamily: 'PoppinsRegular',
  },
  input: {
    width: '79%',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    fontFamily: 'PoppinsRegular',
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
})
