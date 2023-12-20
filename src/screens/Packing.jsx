import React from 'react'
import { View, Text, Image } from 'react-native'
import { DeliveryStyles } from '../Styles/DeliveryStyles'
import Svg, {
  Circle,
  Defs,
  ClipPath,
  Image as SvgImage,
} from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../Styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native'

const Packing = () => {
  const navigation = useNavigation()
  const radius = 40
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (60 / 100) * circumference

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
          onPress={() => navigation.navigate('Products')}
        >
          <Svg
            style={DeliveryStyles.circle}
            height={radius * 2}
            width={radius * 2}
          >
            <Defs>
              <ClipPath id="clipCard">
                <Circle cx={radius} cy={radius} r={radius - strokeWidth / 2} />
              </ClipPath>
            </Defs>
            <SvgImage
              href={require('../img/loading.png')}
              width={45}
              height={32}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipCard)"
              x={18}
              y={22}
              r={20}
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke="#8FDE9B"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={0}
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke="#62C471"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <View>
            <Text style={DeliveryStyles.tittleRoute}>Ruta 1</Text>
            <Text style={DeliveryStyles.textRoute}>Paula Vanegas</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Packing
