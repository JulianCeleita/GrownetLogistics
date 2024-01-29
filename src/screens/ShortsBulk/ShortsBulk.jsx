import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { BtnGoBack } from '../../components/BtnGoBack'
import CircleProgress from '../../components/CircleProgress'
import useOrdersByDate from '../../store/useOrdersByDateStore'
import { DeliveryStyles } from '../../styles/DeliveryStyles'
import { GlobalStyles } from '../../styles/GlobalStyles'
import Svg, {
  Circle,
  Defs,
  ClipPath,
  Image as SvgImage,
} from 'react-native-svg'
import { colors } from '../../styles/GlobalStyles'

function ShortsBulk() {
  const navigation = useNavigation()
  const { routesByDate, setOrdersByDate, setSelectedRoute } = useOrdersByDate()
  const radius = 40
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius

  const handleRoutePress = (nameRoute) => {
    setSelectedRoute(nameRoute)
    setOrdersByDate(nameRoute, routesByDate)
    navigation.navigate('ProductsBulk', { nameRoute: nameRoute })
  }

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
          <MaterialCommunityIcons
            name="package-variant"
            style={{ marginRight: 10 }}
            size={45}
            color={'white'}
          />
          <Text style={DeliveryStyles.textTittle}>Shorts Bulk</Text>
        </View>
        <LinearGradient
          colors={['#00478C', '#026CD2']}
          style={DeliveryStyles.packing}
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
              <Svg
                style={DeliveryStyles.circle}
                height={radius * 2}
                width={radius * 2}
              >
                <Defs>
                  <ClipPath id="clipCard">
                    <Circle
                      cx={radius}
                      cy={radius}
                      r={radius - strokeWidth / 2}
                    />
                  </ClipPath>
                </Defs>
                <SvgImage
                  href={require('../../img/loading.png')}
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
                  stroke={colors.green}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={0}
                />
              </Svg>

              <Text style={DeliveryStyles.tittleRoute}>{order.nameRoute}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default ShortsBulk
