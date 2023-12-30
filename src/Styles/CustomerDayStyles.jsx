import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const CustomerDayStyles = StyleSheet.create({
  //Tittle
  tittleText: {
    fontSize: 24,
    fontFamily: 'PoppinsSemi',
    color: colors.bluePrimary,
  },
  titleCard: {
    width: '65%',
    backgroundColor: 'white',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textTittle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  //Cards
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 10,
    marginTop: 15,
  },
  cardsLayout: {
    width: Platform.OS === 'ios' ? '20%' : '8%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  //Search bar
  searchContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    marginTop: 20,
  },
  searchIcon: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    marginRight: 10,
  },
})
