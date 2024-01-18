import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainAxios from '../../../axios.config'
import { BtnGoBack } from '../../components/BtnGoBack'
import CustomerCard from '../../components/CustomerCard'
import ProductSearcher from '../../components/ProductSearch'
import { percentagePacking } from '../../config/urls.config'
import useEmployeeStore from '../../store/useEmployeeStore'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import usePercentageStore from '../../store/usePercentageStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'

function CustomerDayPacking({ route }) {
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
  return (
    <SafeAreaView style={CustomerDayStyles.customerPricipal}>
      <ScrollView>
        <BtnGoBack color={colors.darkBlue} />
        {search ? (
          <ProductSearcher
            setSearch={setSearch}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
        ) : (
          <View style={CustomerDayStyles.title2}>
            <Text style={CustomerDayStyles.customerTitle}>
              {route.params.nameRoute}
            </Text>
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
