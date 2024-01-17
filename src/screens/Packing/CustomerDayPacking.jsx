import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainAxios from '../../../axios.config'
import CustomerCard from '../../components/CustomerCard'
import { percentagePacking } from '../../config/urls.config'
import useEmployeeStore from '../../store/useEmployeeStore'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import usePercentageStore from '../../store/usePercentageStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/GlobalStyles'
import ProductSearcher from '../../components/ProductSearch'

function CustomerDayPacking() {
  const { ordersByDate } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const { setPercentages } = usePercentageStore()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [search, setSearch] = useState(false)

  const filteredData = ordersByDate.filter((order) => {
    return order.accountName.includes(searchPhrase)
  })
  const handleSearch = () => {
    setSearch(true)
  }
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
  console.log('ordersByDate', ordersByDate)
  return (
    <SafeAreaView style={CustomerDayStyles.customerPricipal}>
      <ScrollView>
        {search ? (
          <ProductSearcher
            setSearch={setSearch}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
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
