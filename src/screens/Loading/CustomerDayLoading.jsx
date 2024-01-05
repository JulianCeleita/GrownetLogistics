import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import CustomerDaySearch from '../../components/CustomerDaySearch'
import { LinearGradient } from 'expo-linear-gradient'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import CustomerCard from '../../components/CustomerCard'
import useTokenStore from '../../store/useTokenStore'

function CustomerDayLoading() {
  const { OrdersByDate, setOrdersByDate } = useOrdersByDate()
  const { token } = useTokenStore()

  const [search, setSearch] = useState(false)
  useEffect(() => {
    setOrdersByDate(token)
  }, [])
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
        {OrdersByDate?.map((order) => {
          return (
            <View key={`${order.id_stateOrders}-${order.created_date}`}>
              <CustomerCard customer={order} loadingCard />
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayLoading
