import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import CustomerDaySearch from '../../components/CustomerDaySearch'
import CustomerCard from '../../components/CustomerCard'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import useTokenStore from '../../store/useTokenStore'

function CustomerDayPacking() {
  const { OrdersByDate, setOrdersByDate } = useOrdersByDate()
  const { token } = useTokenStore()

  // const isIOS = Platform.OS === 'ios'
  // const { width, height } = Dimensions.get('window')

  // const titleStyle = {
  //   ...DeliveryStyles.tittle,
  //   ...GlobalStyles.boxShadow,
  //   elevation: 5,
  //   zIndex: 5,
  // }
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
              <CustomerCard customer={order} />
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayPacking
