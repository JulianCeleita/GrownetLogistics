import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import { BtnGoBack } from '../../components/BtnGoBack'
import CircleProgress from '../../components/CircleProgress'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { GlobalStyles } from '../../styles/GlobalStyles'
import useEmployeeStore from '../../store/useEmployeeStore'

const Packing = () => {

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
    navigation.navigate('CustomerDayPacking', { nameRoute: nameRoute })
  }

  useFocusEffect(
    useCallback(() => {
      setRoutesByDate(employeeToken, selectedDate)
    }, [],))

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <BtnGoBack color="white" top={Platform.OS === 'ios' ? 65 : 20} />
        <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow, {
          marginTop: Platform.OS === 'ios' ? 65 : 30,
        }]}>
          <Image
            style={DeliveryStyles.imageTittlePacking}
            source={require('../../img/packingBlanco.png')}
            alt="Loading"
          />
          <Text style={DeliveryStyles.textTittle}>Packing</Text>
        </View>
        <LinearGradient
          colors={['#00478C', '#026CD2']}
          style={[
            DeliveryStyles.packing,
            { height: Platform.OS === 'ios' ? 140 : 100 },
          ]}
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
              <CircleProgress percentage={order.percentage_packing} />
              <Text style={DeliveryStyles.tittleRoute}>{order.nameRoute}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Packing
