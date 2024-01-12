import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import CircleProgress from '../../components/CircleProgress'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import useEmployeeStore from '../../store/useEmployeeStore'

const Packing = () => {
  const { setRoutesByDate, selectedDate } = useOrdersByDate()
  const { employeeToken } = useEmployeeStore()
  const navigation = useNavigation()

  useEffect(() => {
    setRoutesByDate(employeeToken, selectedDate)
    console.log('Fecha seleccionada en packing', selectedDate)
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <LinearGradient
          colors={['#00478C', '#026CD2']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={DeliveryStyles.packing}
        >
          <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow]}>
            <Image
              style={DeliveryStyles.imageTittlePacking}
              source={require('../../img/packingBlanco.png')}
              alt="Loading"
            />
            <Text style={DeliveryStyles.textTittle}>Packing</Text>
          </View>
        </LinearGradient>

        <View style={DeliveryStyles.delivery}>
          <TouchableOpacity
            style={[DeliveryStyles.card, { marginTop: Platform.OS === 'ios' ? 20 : 30 }]}
            onPress={() => navigation.navigate('CustomerDayPacking')}
          >
            <CircleProgress />
            <Text style={DeliveryStyles.tittleRoute}>Route 1</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Packing
