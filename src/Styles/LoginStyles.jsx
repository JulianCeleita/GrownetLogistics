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
    fontSize: Platform.OS === 'ios' ? 18 : 15,
    marginBottom: 30,
    fontFamily: 'Poppins',
  },
  input: {
    height: 60,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 35,
    fontFamily: 'Poppins',
  },
  signInButton: {
    backgroundColor: '#144D56',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 35,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
})
