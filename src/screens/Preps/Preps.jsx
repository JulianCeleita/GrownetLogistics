import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback } from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { BtnGoBack } from '../../components/BtnGoBack'
import CircleProgress from '../../components/CircleProgress'
import useEmployeeStore from '../../store/useEmployeeStore'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { GlobalStyles } from '../../styles/GlobalStyles'

const Preps = () => {
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
    navigation.navigate('CustomerDayPreps', { nameRoute: nameRoute })
  }

  useFocusEffect(
    useCallback(() => {
      setRoutesByDate(employeeToken, selectedDate)
      return () => {
        setRoutesByDateClean([])
      }
    }, [navigation]),
  )

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <BtnGoBack color="white" top={Platform.OS === 'ios' ? 65 : 20} />
        <View
          style={[
            DeliveryStyles.tittle,
            GlobalStyles.boxShadow,
            {
              marginTop: Platform.OS === 'ios' ? 80 : 30,
            },
          ]}
        >
          <Image
            style={DeliveryStyles.imageTittlePacking}
            source={require('../../img/packingBlanco.png')}
            alt="Loading"
          />
          <Text style={DeliveryStyles.textTittle}>Preps</Text>
        </View>
        <LinearGradient
          colors={['#00478C', '#026CD2']}
          style={[
            DeliveryStyles.packing,
            { height: Platform.OS === 'ios' ? 140 : 100 },
          ]}
        />
        {!isLoading ? (
          <View style={DeliveryStyles.delivery}>
            {routesByDate.map((route) => (
              <TouchableOpacity
                style={[
                  DeliveryStyles.card,
                  { marginTop: Platform.OS === 'ios' ? 20 : 30 },
                ]}
                onPress={() => handleRoutePress(route.nameRoute)}
                key={route.nameRoute}
              >
                <CircleProgress
                  percentage={
                    route.percentage_loading === 100
                      ? route.percentage_loading
                      : route.percentage_packing
                  }
                />
                <Text style={DeliveryStyles.tittleRoute}>
                  {route.nameRoute}
                </Text>
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

export default Preps
