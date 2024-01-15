import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const ProductStyles = StyleSheet.create({
  products: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
  },
  card: {
    width: 120,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 110,
  },
  category: {
    fontFamily: 'PoppinsSemi',
    marginTop: 10,
    marginBottom: 0,
    fontSize: 18,
    color: colors.darkBlue,
    textAlign: 'left',
  },
  qty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productTittle: {
    paddingVertical: 10,
    paddingLeft: 20,
    width: '72%',
  },
  tittleCard: {
    fontSize: 16,
    color: colors.darkBlue,
    fontFamily: 'PoppinsSemi',
    marginTop: 15,
    textDecorationLine: 'none',
  },
  textCard: {
    fontSize: 15,
    color: colors.darkBlue,
    fontFamily: 'PoppinsMedium',
    marginBottom: 15,
  },
  checkBox: {
    height: '100%',
    backgroundColor: colors.gray,
    width: '25%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ventana: {
    marginTop: 15,
    marginLeft: 10,
    width: 70,
    height: '85%',
    textAlign: 'center',
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 15,
    paddingTop: 25,
    paddingLeft: 20,
  },
  //Detalles
  details: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    borderRightWidth: 8,
  },
  information: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsCard: {
    width: '60%',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    height: 40,
    marginLeft: 10,
    paddingHorizontal: 15,
    fontFamily: 'PoppinsRegular',
  },
  iconSearch: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    top: 5,
  },
  icon: {
    position: 'absolute',
    right: 26,
  },
  icon2: {
    position: 'absolute',
    right: 26,
    marginTop: Platform.OS === 'ios' ? 55 : 10,
  },
  customerTitle: {
    fontSize: 18,
    color: colors.bluePrimary,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },
})

export const SearchStyles = StyleSheet.create({
  // SEARCH BAR
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSearch: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 40,
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    width: '80%',
  },

  BgInput: {
    flex: 1,
    borderRadius: 51,
    paddingLeft: 20,
    fontSize: 16,
    color: '#04444f',
    fontFamily: 'PoppinsRegular',
    backgroundColor: '#f2f2f2',
  },
  iconSearch: {
    position: 'absolute',
    right: 20,
    top: 13,
  },
  iconClose: {
    marginLeft: 5,
    marginTop: 20,
  },
})
