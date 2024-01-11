import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'
import CircleProgress from '../../components/CircleProgress'
import { useNavigation } from '@react-navigation/native'

const Loading = () => {
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
            style={DeliveryStyles.imageTittle}
            source={require('../../img/loadingBlanco.png')}
            alt="Loading"
          />
          <Text style={DeliveryStyles.textTittle}>Loading</Text>
        </View>
      </LinearGradient>

      <View style={DeliveryStyles.delivery}>
        <TouchableOpacity
          style={[DeliveryStyles.card, { marginTop: Platform.OS === 'ios' ? 20 : 30 }]}
          onPress={() => navigation.navigate('CustomerDayLoading')}
        >
          <CircleProgress />
          <Text style={DeliveryStyles.tittleRoute}>Route 1</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Loading
