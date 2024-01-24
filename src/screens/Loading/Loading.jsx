import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback } from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
import CircleProgress from '../../components/CircleProgress'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { GlobalStyles } from '../../styles/GlobalStyles'
import useEmployeeStore from '../../store/useEmployeeStore'

const Loading = () => {
  const navigation = useNavigation()
  const {
    routesByDate,
    setOrdersByDate,
    setSelectedRoute,
    setRoutesByDate,
    selectedDate
  } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()

  const handleRoutePress = (nameRoute) => {
    setSelectedRoute(nameRoute)
    setOrdersByDate(nameRoute, routesByDate)
    navigation.navigate('CustomerDayLoading', { nameRoute: nameRoute })
  }

  useFocusEffect(
    useCallback(() => {
      console.log('Carga de porcentajes en loading');
      setRoutesByDate(employeeToken, selectedDate)
    }, [],))

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <BtnGoBack color="white" top={20} />
        <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow]}>
          <Image
            style={DeliveryStyles.imageTittle}
            source={require('../../img/loadingBlanco.png')}
            alt="Loading"
          />
          <Text style={DeliveryStyles.textTittle}>Loading</Text>
        </View>
        <LinearGradient
          colors={['#00478C', '#026CD2']}
          style={DeliveryStyles.packing}
        />

        <View style={DeliveryStyles.delivery}>
          {routesByDate.map((order) => (
            <TouchableOpacity
              style={[
                DeliveryStyles.card,
                { marginTop: Platform.OS === 'ios' ? 20 : 30 },
              ]}
              onPress={() => handleRoutePress(order.nameRoute)}
              key={order.nameRoute}
            >
              <CircleProgress percentage={order.percentage_loading} />
              <Text style={DeliveryStyles.tittleRoute}>{order.nameRoute}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Loading
