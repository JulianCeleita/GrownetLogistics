import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const ProductStyles = StyleSheet.create({
  products: {
    backgroundColor: colors.bluePrimary,
    height: '100%',
    alignItems: 'center',
  },
  card: {
    width: 320,
    backgroundColor: 'white',
    margin: 1,
    borderRadius: 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTittle: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  tittleCard: {
    fontSize: 20,
    color: colors.darkBlue,
    fontFamily: 'PoppinsSemi',
  },
  textCard: {
    fontSize: 16,
    color: colors.darkBlue,
    fontFamily: 'PoppinsMedium',
  },
  checkBox: {
    height: '100%',
    backgroundColor: colors.gray,
    width: 75,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    paddingTop: 25,
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
})

export const SearchStyles = StyleSheet.create({
  // SEARCH BAR
  containerSearch: {
    flexDirection: 'row',
    marginHorizontal: 30,
    height: 50,
    borderColor: colors.bluePrimary,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 20,
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
})
