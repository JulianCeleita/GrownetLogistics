import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const CustomerDayStyles = StyleSheet.create({
  tittle: {
    backgroundColor: colors.bluePrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: -12,
  },
  title2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
  },
  customerTitle: {
    fontSize: 22,
    color: colors.bluePrimary,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    right: 18,
  },
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
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 2,
    marginTop: 10,
    width: 320,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cardsLayout: {
    width: Platform.OS === 'ios' ? '20%' : '8%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  cardText: {
    alignItems: 'left',
    paddingLeft: 15,
    width: '60%',
  },
  titleCustomer: {
    fontSize: 16,
    fontFamily: 'PoppinsSemi',
    color: colors.darkBlue,
  },
  textCustomer: {
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    color: colors.darkBlue,
  },
  //Texto de Restaurantes en shortVan
  restaurantName: {
    fontSize: 18,
    color: "#026CD2",  // Cambia el color según tus preferencias
    fontFamily: 'PoppinsSemi',
    textAlign: 'left',
  },
})
