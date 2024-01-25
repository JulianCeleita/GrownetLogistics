import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'
import { Dimensions } from 'react-native'

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
  },
  cardsCustomers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 8,
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
  restaurantTypeTitle: {
    fontSize: 16,
    color: colors.bluePrimary,
    fontFamily: 'PoppinsSemi',
    textAlign: 'left',
    marginTop: 10,
  },  
  toggleButton: {
    width: 60,
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleOn: {
    backgroundColor: '#ccc',
  },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#888',
  },
  toggleDotOn: {
    backgroundColor: 'green',
  },
})
