import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainAxios from '../../../axios.config'
import CustomerCard from '../../components/CustomerCard'
import { percentagePacking } from '../../config/urls.config'
import useEmployeeStore from '../../store/useEmployeeStore'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import usePercentageStore from '../../store/usePercentageStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'

function CustomerDayPacking() {
  const { ordersByDate } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const { setPercentages } = usePercentageStore()
  const [searchPhrase, setSearchPhrase] = useState('')

  const filteredData = ordersByDate.filter((order) => {
    return order.accountName.includes(searchPhrase)
  })

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const response = await mainAxios.get(percentagePacking, {
            headers: {
              Authorization: `Bearer ${employeeToken}`,
            },
          })
          setPercentages(response.data.orders)
        } catch (error) {
          console.error('Error al obtener porcentaje:', error)
        }
      }
      fetchData()
    }, [employeeToken]),
  )

  return (
    <SafeAreaView style={CustomerDayStyles.customerPricipal}>
      <ScrollView>
        <View style={CustomerDayStyles.title2}>
          <Text style={CustomerDayStyles.customerTitle}>Route 1</Text>
        </View>
        <TextInput
          style={''}
          placeholder="Buscar"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        <View style={CustomerDayStyles.cardsCustomers}>
          {filteredData?.map((order, index) => {
            return (
              <View key={index}>
                <CustomerCard customer={order} />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayPacking
