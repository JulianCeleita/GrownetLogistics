import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
import CustomerCard from '../../components/CustomerCard'
import ProductSearcher from '../../components/ProductSearch'
import { AnimatedSearch, AnimatedSearchCard } from '../../components/animation'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { SearchStyles } from '../../styles/ProductStyles'

function CustomerDayPacking({ route }) {
  const { nameRoute } = route.params
  const {
    ordersByDate,
    setOrdersByDate,
    setOrdersByDateClean,
    routesByDate,
  } = useOrdersByDate()

  const [searchPhrase, setSearchPhrase] = useState('')
  const [search, setSearch] = useState(false)

  const filteredData = ordersByDate.filter((order) => {
    return order.accountName.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      order.orders_reference.toString().trim().includes(searchPhrase.toString().trim())
  })

  const handleSearch = () => {
    setSearch(true)
  }

  useFocusEffect(
    useCallback(() => {
      setOrdersByDate(nameRoute, routesByDate)
      return () => {
        setOrdersByDateClean([])
      }
    }, []),)

  return (
    <SafeAreaView style={CustomerDayStyles.customerPricipal}>
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
                  <CustomerCard customer={order} />
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
    </SafeAreaView>
  )
}

export default CustomerDayPacking
