import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const DeliveryStyles = StyleSheet.create({
  packing: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tittle: {
    backgroundColor: colors.bluePrimary,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 15,
    fontWeight: 500,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: -12,
  },
  textTittle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  imageTittle: {
    width: 65,
    height: 47,
    marginRight: 20,
  },
  imageTittlePacking: {
    width: 60,
    height: 52,
    marginRight: 20,
  },
  tittleRoute: {
    backgroundColor: colors.bluePrimary,
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    width: 90,
    fontFamily: 'PoppinsSemi',
  },
  textRoute: {
    marginTop: 5,
    fontSize: 17,
    fontFamily: 'PoppinsRegular',
  },
  delivery: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  circle: {
    marginRight: 50,
  },
})
