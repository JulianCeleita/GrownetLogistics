import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainAxios from '../../../axios.config.js'
import { BtnGoBack } from '../../components/BtnGoBack.jsx'
import CustomerCard from '../../components/CustomerCard'
import ProductSearcher from '../../components/ProductSearch.jsx'
import { percentageLoading } from '../../config/urls.config'
import useEmployeeStore from '../../store/useEmployeeStore.js'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import usePercentageStore from '../../store/usePercentageStore.js'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { SearchStyles } from '../../styles/ProductStyles.jsx'
import {
  AnimatedSearch,
  AnimatedSearchCard,
} from '../../components/animation.jsx'

function CustomerDayLoading({ route }) {
  const { ordersByDate } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const { setPercentages } = usePercentageStore()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [search, setSearch] = useState(false)

  const filteredData = ordersByDate.filter((order) => {
    return order.accountName.toLowerCase().includes(searchPhrase.toLowerCase())
  })
  const handleSearch = () => {
    setSearch(true)
  }

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
        } catch (error) {
          console.error('Error al obtener porcentaje:', error)
        }
      }
      fetchData()
    }, [employeeToken]),
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View>
          {search ? (
            <AnimatedSearch search={search}>
              <BtnGoBack color={colors.darkBlue} top={20} />
              <ProductSearcher
                setSearch={setSearch}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
              />
            </AnimatedSearch>
          ) : (
            <View style={CustomerDayStyles.title2}>
              <BtnGoBack color={colors.darkBlue} />
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
        </View>
        <AnimatedSearchCard search={search}>
          <View style={CustomerDayStyles.cardsCustomers}>
            {filteredData.length > 0 ? (
              filteredData.map((order, index) => (
                <View key={index}>
                  <CustomerCard customer={order} loadingCard />
                </View>
              ))
            ) : (
              <View style={SearchStyles.alertSearch}>
                <Ionicons
                  name="alert-circle-outline"
                  size={180}
                  color={colors.gray}
                />
                <Text style={SearchStyles.textAlert}>
                  No orders found, please search again
                </Text>
              </View>
            )}
          </View>
        </AnimatedSearchCard>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerDayLoading
