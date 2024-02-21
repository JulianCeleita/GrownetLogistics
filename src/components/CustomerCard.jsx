import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import useLoadingStore from '../store/useLoadingStore'
import { usePackingStore } from '../store/usePackingStore'
import usePercentageStore from '../store/usePercentageStore'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../styles/GlobalStyles'

const CustomerCard = ({ customer, loadingCard }) => {
  const { setSelectedOrder } = usePackingStore()
  const { setSelectedOrderL } = useLoadingStore()
  const { percentagesP, percentagesL } = usePercentageStore()

  const navigation = useNavigation()
  const radius = 33
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  let roundedPercentage = 0
  const handleNavigateToProducts = () => {
    if (!loadingCard) {
      setSelectedOrder(customer.orders_reference)
      navigation.navigate('ProductsPacking', {
        selectedCustomer: customer.accountNumber,
        accountName: customer.accountName,
        orderNumber: customer.orders_reference,
      })
    } else {
      setSelectedOrderL(customer.orders_reference)
      navigation.navigate('ProductsLoading', {
        selectedCustomer: customer.accountNumber,
        accountName: customer.accountName,
        orderNumber: customer.orders_reference,
      })
    }
  }

  if (!loadingCard) {
    let percentP = null;
    let percentL = null;
    percentagesP.forEach((order) => {
      if (order.reference === customer.orders_reference) {
        percentP = Number(order.percentage).toFixed(0)
      }
    })
    percentagesL.forEach((order) => {
      if (order.reference === customer.orders_reference) {
        percentL = Number(order.percentage).toFixed(0)
      }
    })

    roundedPercentage = percentL <= 0 || percentL === null ? percentP : percentL;
  } else {
    percentagesL.forEach((order) => {
      if (order.reference === customer.orders_reference) {
        roundedPercentage = Number(order.percentage).toFixed(0)
      }
    })
  }

  const strokeDashoffset =
    circumference - (roundedPercentage / 100) * circumference

  return (
    <View>
      <TouchableOpacity
        style={[CustomerDayStyles.card, GlobalStyles.boxShadow]}
        onPress={handleNavigateToProducts}
      >
        <View style={CustomerDayStyles.cardsLayout}>
          <Svg height={radius * 2} width={radius * 2}>
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke={
                roundedPercentage <= 49
                  ? '#FFB7B7'
                  : roundedPercentage <= 99
                    ? '#FFCA8C'
                    : roundedPercentage == 100
                      ? colors.green
                      : '#FFB7B7'
              }
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={0}
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke={
                roundedPercentage <= 49
                  ? colors.danger
                  : roundedPercentage <= 99
                    ? colors.orange
                    : roundedPercentage == 100
                      ? colors.green
                      : colors.danger
              }
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
            <SvgText
              x={radius - 0}
              y={radius + 6}
              textAnchor="middle"
              stroke="#00478C"
              fontSize="16"
              fill={colors.darkBlue}
            >
              {roundedPercentage + '%'}
            </SvgText>
          </Svg>
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
