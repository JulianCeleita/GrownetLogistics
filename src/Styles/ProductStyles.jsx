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
})

export const SearchStyles = StyleSheet.create({
  // SEARCH BAR
  containerSearch: {
    flexDirection: 'row',
    marginHorizontal: 30,
    height: 50,
    //borderColor: colors.gray,
    //borderWidth: 1,
    borderRadius: 30,
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
