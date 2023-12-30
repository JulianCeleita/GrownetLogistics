import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import CustomerDaySearch from '../../components/CustomerDaySearch'

function CustomerDayPacking() {
  const navigation = useNavigation()
  const isIOS = Platform.OS === 'ios'
  const { width, height } = Dimensions.get('window')
  
  const titleStyle = {
    ...DeliveryStyles.tittle,
    ...GlobalStyles.boxShadow,
    elevation: 5,
    zIndex: 5,
  }
  const [search, setSearch] = useState(false)

  const radius = 33
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const percentage = 60
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const handleNavigateToProducts = () => {
    navigation.navigate('ProductsLoading')
  }
  const handleSearch = () => {
    setSearch(true)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {search ? (
          <CustomerDaySearch setSearch={setSearch} />
        ) : (
          <View style={CustomerDayStyles.title2}>
            <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
            <TouchableOpacity
              onPress={handleSearch}
              style={CustomerDayStyles.icon}
            >
              <Ionicons
                name="md-search-circle-outline"
                size={35}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{ alignItems: 'center' }}>
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
                (1) Customer 1:
              </Text>
              <Text style={CustomerDayStyles.textCustomer}>152659</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayPacking
