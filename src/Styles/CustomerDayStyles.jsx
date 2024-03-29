import { Platform, StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const CustomerDayStyles = StyleSheet.create({
  customerPricipal: {
    backgroundColor: 'white',
    flex: 1,
  },
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
    paddingTop: 10,
    width: '100%',
    backgroundColor: 'white',
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
    top: 5,
  },
  cardsCustomers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 8,
    marginBottom: 2,
    marginTop: 10,
    width: 320,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardsLayout: {
    width: Platform.OS === 'ios' ? '20%' : '8%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  cardText: {
    width: '50%',
    alignContent: 'center',
    marginLeft: 10,
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
  titleNA: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    height: 80,
    top: Platform.OS === 'ios' ? -26 : -23,
    left: 85,
  },
  restaurantTypeTitle: {
    fontSize: 16,
    color: colors.darkBlue,
    fontFamily: 'PoppinsSemi',
    marginHorizontal: 5,
  },

  toggleButton: {
    width: 55,
    height: 30,
    backgroundColor: '#D8D8D8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    marginHorizontal: 2,
    flexDirection: 'row',
  },
  toggleOn: {
    backgroundColor: colors.green,
  },
  toggleDot: {
    width: 23,
    height: 23,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  toggleDot2: {
    width: 23,
    height: 23,
    borderRadius: 50,
    marginRight: 1,
    backgroundColor: '#D8D8D8',
  },
  toggleDotOff: {
    backgroundColor: colors.green,
  },
  toggleDotOn: {
    backgroundColor: 'white',
  },
  cardIcons: {
    width: '20%',
    alignItems: 'center',
    marginRight: 10,
  },
})
