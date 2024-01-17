import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CircleProgress from '../../components/CircleProgress'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { GlobalStyles } from '../../styles/GlobalStyles'

function ShortsVans() {
  const navigation = useNavigation()
  const { routesByDate, setOrdersByDate, setSelectedRoute } = useOrdersByDate()

  const handleRoutePress = (nameRoute) => {
    setSelectedRoute(nameRoute)
    setOrdersByDate(nameRoute, routesByDate)
    navigation.navigate('ProductsVan', { nameRoute: nameRoute })
  }

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#00478C', '#026CD2']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={DeliveryStyles.packing}
      >
        <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow]}>
          <MaterialCommunityIcons
            name="truck-fast-outline"
            style={{ marginRight: 10 }}
            size={50}
            color={'white'}
          />
          <Text style={DeliveryStyles.textTittle}>Shorts Van</Text>
        </View>
      </LinearGradient>

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
            <CircleProgress />
            <Text style={DeliveryStyles.tittleRoute}>{order.nameRoute}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default ShortsVans
