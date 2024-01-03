import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'

const CustomerCard = ({ customer }) => {
  const radius = 33
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const percentage = 60
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const handleNavigateToProducts = () => {
    navigation.navigate('ProductsPacking')
  }
  return (
    <View style={{ alignItems: 'center' }} key={customer.id_stateOrders}>
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
              stroke="#8FDE9B"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={0}
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke="#62C471"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
            <SvgText
              x={radius - 6}
              y={radius + 6}
              textAnchor="middle"
              stroke="#00478C"
              fontSize="16"
              fill={colors.darkBlue}
            >
              {percentage}%
            </SvgText>
          </Svg>
        </View>
        <View style={CustomerDayStyles.cardText}>
          <Text style={CustomerDayStyles.titleCustomer}>
            {customer.accountName}:
          </Text>
          <Text style={CustomerDayStyles.textCustomer}>
            {customer.reference}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CustomerCard