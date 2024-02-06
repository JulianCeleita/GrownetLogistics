import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import useLoadingStore from '../store/useLoadingStore'
import { usePackingStore } from '../store/usePackingStore'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'
import { GlobalStyles } from '../styles/GlobalStyles'
import CircleProgress from '../components/CircleProgress';

const CustomerCard = ({ customer, loadingCard }) => {
  const { setSelectedOrder } = usePackingStore()
  const { setSelectedOrderL } = useLoadingStore()

  const navigation = useNavigation()

  const handleNavigateToProducts = () => {
    if (!loadingCard) {
      navigation.navigate('ProductsPacking', {
        selectedCustomer: customer.accountNumber,
        accountName: customer.accountName,
        orderNumber: customer.orders_reference,
      })
      setSelectedOrder(customer.orders_reference)
    } else {
      navigation.navigate('ProductsLoading', {
        selectedCustomer: customer.accountNumber,
        accountName: customer.accountName,
        orderNumber: customer.orders_reference,
      })
      setSelectedOrderL(customer.orders_reference)
    }
  }

  console.log('customer', customer);

  const percentage = Number(customer.percentage_loading).toFixed(0) > 0
    ? Number(customer.percentage_loading).toFixed(0)
    : Number(customer.percentage_packing).toFixed(0)

  return (
    <View>
      <TouchableOpacity
        style={[CustomerDayStyles.card, GlobalStyles.boxShadow]}
        onPress={handleNavigateToProducts}
      >
        <View style={CustomerDayStyles.cardsLayout}>
          <CircleProgress percentage={percentage} />
        </View>
        <View style={CustomerDayStyles.cardText}>
          <Text style={CustomerDayStyles.titleCustomer}>
            {customer.accountName}:
          </Text>
          <Text style={CustomerDayStyles.textCustomer}>
            {customer.orders_reference}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CustomerCard
