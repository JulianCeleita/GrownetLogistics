import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainAxios from '../../../axios.config'
import CustomerCard from '../../components/CustomerCard'
import CustomerDaySearch from '../../components/CustomerDaySearch'
import { percentagePacking } from '../../config/urls.config'
import useEmployeeStore from '../../store/useEmployeeStore'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'

function CustomerDayPacking() {
  const { ordersByDate } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const [percentages, setPercentages] = useState([])

  // const isIOS = Platform.OS === 'ios'
  // const { width, height } = Dimensions.get('window')

  // const titleStyle = {
  //   ...DeliveryStyles.tittle,
  //   ...GlobalStyles.boxShadow,
  //   elevation: 5,
  //   zIndex: 5,
  // }
  const [search, setSearch] = useState(false)

  const handleSearch = () => {
    setSearch(true)
  }
  console.log(percentagePacking)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await mainAxios
          .get(percentagePacking, {
            headers: {
              Authorization: `Bearer ${employeeToken}`,
            },
          })
          .then((response) => {
            setPercentages(response.data.orders)
          })
      } catch (error) {
        console.error('Error al obtener porcentaje:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <SafeAreaView style={CustomerDayStyles.customerPricipal}>
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
        <View style={CustomerDayStyles.cardsCustomers}>
          {ordersByDate?.map((order) => {
            return (
              <View key={order.accountName}>
                <CustomerCard customer={order} percentages={percentages} />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayPacking
