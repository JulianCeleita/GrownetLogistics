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
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
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
    fontSize: 18,
    width: 90,
    fontFamily: 'PoppinsSemi',
    marginTop: 10,
    overflow: 'hidden',
  },
  textRoute: {
    marginTop: 5,
    fontSize: 17,
    fontFamily: 'PoppinsRegular',
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '100%',
  },
  card: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
  },
  circle: {
    marginTop: 15,
  },
})
