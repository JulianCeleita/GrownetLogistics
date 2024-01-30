import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect } from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native'
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
    selectedDate,
    setRoutesByDateClean,
    isLoading,
  } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()

  const handleRoutePress = (nameRoute) => {
    setSelectedRoute(nameRoute)
    setOrdersByDate(nameRoute, routesByDate)
    navigation.navigate('CustomerDayLoading', { nameRoute: nameRoute })
  }

  useEffect(() => {
    console.log('routesByDate en loading', routesByDate);
    setRoutesByDate(employeeToken, selectedDate)
    return () => {
      setRoutesByDateClean([])
      console.log('clean packing');
    }
  }, [navigation])

  // useFocusEffect(
  //   useCallback(() => {
  //     setRoutesByDate(employeeToken, selectedDate)
  //     return () => {
  //       setRoutesByDateClean([])
  //       console.log('clean loading');
  //     }
  //   }, [navigation],))

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <BtnGoBack color="white" top={Platform.OS === 'ios' ? 65 : 20} />
        <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow, {
          marginTop: Platform.OS === 'ios' ? 80 : 30,
        }]}>
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

        {!isLoading ? (
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
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 40,
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}


      </ScrollView>
    </View>
  )
}

export default Loading
