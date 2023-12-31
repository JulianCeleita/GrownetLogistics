import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomerCard from '../../components/CustomerCard'
import CustomerDaySearch from '../../components/CustomerDaySearch'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import useTokenStore from '../../store/useTokenStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { percentageLoading } from '../../config/urls.config'
import mainAxios from '../../../axios.config.js'

function CustomerDayLoading() {
  const { OrdersByDate, setOrdersByDate } = useOrdersByDate()
  const { token } = useTokenStore()
  const [search, setSearch] = useState(false)
  const [percentages, setPercentages] = useState([])

  useEffect(() => {
    setOrdersByDate(token)
  }, [])
  const handleSearch = () => {
    setSearch(true)
  }
  //Llamado API porcentaje
  useEffect(() => {
    async function fetchData() {
      const newToken = '2025|YlaiMYOtLuIEnt6zq0kmKPUvYHQMeoycqBrNTiAQ'
      try {
        const response = await mainAxios
          .get(percentageLoading, {
            headers: {
              Authorization: `Bearer ${newToken}`,
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
  console.log(percentages, 'esta llegando')
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
              <CustomerCard
                customer={order}
                loadingCard
                percentages={percentages}
              />
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayLoading
