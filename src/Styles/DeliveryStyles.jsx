import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const DeliveryStyles = StyleSheet.create({
  packing: {
    backgroundColor: '#00478C',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tittle: {
    backgroundColor: colors.bluePrimary,
    padding: 10,
    borderRadius: 15,
    fontWeight: 500,
    flexDirection: 'row',
    width: 300,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: -12,
  },
  textTittle: {
    fontSize: 20,
    color: 'white',
  },
  imageTittle: {
    width: 60,
    height: 40,
    marginRight: 15,
  },
  tittleRoute: {
    backgroundColor: colors.bluePrimary,
    padding: 10,
    borderRadius: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
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
  },
  circle: {
    marginRight: 15,
  },
})
