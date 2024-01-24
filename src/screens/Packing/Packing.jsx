import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
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

const Packing = () => {
  const navigation = useNavigation()
  const { routesByDate, setOrdersByDate, setSelectedRoute } = useOrdersByDate()
  const handleRoutePress = (nameRoute) => {
    setSelectedRoute(nameRoute)
    setOrdersByDate(nameRoute, routesByDate)
    navigation.navigate('CustomerDayPacking', { nameRoute: nameRoute })
  }
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <BtnGoBack color="white" top={20} />
        <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow]}>
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
            { paddingTop: Platform.OS === 'ios' ? 50 : 0 },
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
