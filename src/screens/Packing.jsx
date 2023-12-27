import React from 'react'
import { View, Text, Image } from 'react-native'
import { DeliveryStyles } from '../Styles/DeliveryStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../Styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import CircleProgress from '../components/CircleProgress'

const Packing = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#00478C', '#026CD2']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={DeliveryStyles.packing}
      >
        <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow]}>
          <Image
            style={DeliveryStyles.imageTittlePacking}
            source={require('../img/packingBlanco.png')}
            alt="Loading"
          />
          <Text style={DeliveryStyles.textTittle}>Packing</Text>
        </View>
      </LinearGradient>

      <View style={DeliveryStyles.delivery}>
        <TouchableOpacity
          style={DeliveryStyles.card}
          onPress={() => navigation.navigate('CustomerDayPackingScreen')}
        >
          <CircleProgress />
          <Text style={DeliveryStyles.tittleRoute}>Ruta 1</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Packing
