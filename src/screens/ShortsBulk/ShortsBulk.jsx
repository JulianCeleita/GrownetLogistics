import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { GlobalStyles } from '../../styles/GlobalStyles'
import CircleProgress from '../../components/CircleProgress'
function ShortsBulk() {
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
          <MaterialCommunityIcons
            name="package-variant"
            style={{ marginRight: 10 }}
            size={50}
            color={'white'}
          />
          <Text style={DeliveryStyles.textTittle}>Shorts Bulk</Text>
        </View>
      </LinearGradient>

      <View style={DeliveryStyles.delivery}>
        <TouchableOpacity
          style={[DeliveryStyles.card, { marginTop: Platform.OS === 'ios' ? 20 : 30 }]}
          onPress={() => navigation.navigate('ProductsBulk')}
        >
          <CircleProgress />
          <Text style={DeliveryStyles.tittleRoute}>Ruta 1</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ShortsBulk
