import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainAxios from '../../../axios.config.js'
import CustomerCard from '../../components/CustomerCard'
import CustomerDaySearch from '../../components/CustomerDaySearch'
import { percentageLoading } from '../../config/urls.config'
import useEmployeeStore from '../../store/useEmployeeStore.js'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import usePercentageStore from '../../store/usePercentageStore.js'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'

function CustomerDayLoading() {
  const { ordersByDate } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const [search, setSearch] = useState(false)
  const { setPercentages } = usePercentageStore()

  /* TODO CREAR FUNCIÓN DE BUSQUEDA */
  /* const handleSearch = () => {
    setSearch(true)
  }*/

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const response = await mainAxios.get(percentageLoading, {
            headers: {
              Authorization: `Bearer ${employeeToken}`,
            },
          })
          setPercentages(response.data.orders)
          console.log('Porcentajes:', response.data.orders)
        } catch (error) {
          console.error('Error al obtener porcentaje:', error)
        }
      }
      fetchData()
    }, [employeeToken]),
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {search ? (
          <CustomerDaySearch setSearch={setSearch} />
        ) : (
          <View style={CustomerDayStyles.title2}>
            <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
            <TouchableOpacity
              /* onPress={handleSearch} */
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
                <CustomerCard customer={order} loadingCard />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayLoading
