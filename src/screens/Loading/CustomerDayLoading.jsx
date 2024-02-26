import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack.jsx'
import CustomerCard from '../../components/CustomerCard'
import ProductSearcher from '../../components/ProductSearch.jsx'
import {
  AnimatedSearch,
  AnimatedSearchCard,
} from '../../components/animation.jsx'
import useEmployeeStore from '../../store/useEmployeeStore.js'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import usePercentageStore from '../../store/usePercentageStore.js'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { SearchStyles } from '../../styles/ProductStyles.jsx'
import ModalDebugger from '../../components/ModalDebugger.jsx'

function CustomerDayLoading({ route }) {
  const { nameRoute } = route.params
  const {
    ordersByDate,
    setOrdersByDateClean,
    setOrdersByDate,
    routesByDate
  } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const { setPercentagesL, setFetchPercentagesLoading } = usePercentageStore()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [search, setSearch] = useState(false)
  const [showModalDebugger, setShowModalDebugger] = useState(false)

  const filteredData = ordersByDate.filter((order) => {
    return order.accountName.toLowerCase().trim().includes(searchPhrase.toLowerCase().trim()) ||
      order.orders_reference.toString().trim().includes(searchPhrase.toString().trim())
  })

  const handleSearch = () => {
    setSearch(true)
  }

  useFocusEffect(
    useCallback(() => {
      setFetchPercentagesLoading(employeeToken)
      setOrdersByDate(nameRoute, routesByDate)
      return () => {
        setOrdersByDateClean([])
        setPercentagesL([])
      }
    }, [employeeToken]),
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={{ marginRight: -3 }}
        contentContainerStyle={{ paddingRight: 3 }}
      >
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
                {nameRoute}
              </Text>
              <TouchableOpacity
                onPress={handleSearch}
                onLongPress={() => setShowModalDebugger(true)}
                delayLongPress={5000}
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
            ) : filteredData.length < 0 ? (
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
            ) : filteredData.length === 0 && searchPhrase !== '' ? (
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
            ) : null}
          </View>
        </AnimatedSearchCard>
      </ScrollView>
      <ModalDebugger
        showModalDebugger={showModalDebugger}
        setShowModalDebugger={setShowModalDebugger}
        Title="Debugger"
        message={JSON.stringify(ordersByDate, null, 2)}
      />
    </SafeAreaView>
  )
}

export default CustomerDayLoading
