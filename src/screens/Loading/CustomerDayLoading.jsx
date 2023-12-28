import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import { CustomerDayStyles } from '../../Styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../../Styles/GlobalStyles'
import CustomerDaySearch from '../../components/CustomerDaySearch'
import { LinearGradient } from 'expo-linear-gradient'
import { DeliveryStyles } from '../../Styles/DeliveryStyles'

function CustomerDayLoading() {
  const navigation = useNavigation()
  const isIOS = Platform.OS === 'ios'
  const { width, height } = Dimensions.get('window')

  const radius = 40
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const percentage = 60
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const handleNavigateToProducts = () => {
    navigation.navigate('ProductsLoading')
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 0 }}>
      <LinearGradient
        colors={['#00478C', '#026CD2']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={DeliveryStyles.packing}
      >
        <View style={[DeliveryStyles.tittle, GlobalStyles.boxShadow]}>
          <Text style={DeliveryStyles.textTittle}>Customer day</Text>
        </View>
      </LinearGradient>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 5,
          paddingLeft: 0,
        }}
      >
        <CustomerDaySearch />
        <View style={{ width: '85%' }}>
          <TouchableOpacity
            style={{
              ...CustomerDayStyles.card,
              ...GlobalStyles.boxShadow,
            }}
            onPress={handleNavigateToProducts}
          >
            <View
              style={{
                ...CustomerDayStyles.cardsLayout,
              }}
            >
              <Svg
                style={{ width: '100%' }}
                height={radius * 2}
                width={radius * 2}
              >
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
                <SvgText
                  x={radius - 6}
                  y={radius + 6}
                  textAnchor="middle"
                  stroke="#00478C"
                  fontSize="18"
                  fontFamily="PoppinsRegular"
                  fill="#00478C"
                >
                  {percentage}%
                </SvgText>
              </Svg>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <View
                style={{ width: '90%', alignItems: 'left', marginBottom: 10 }}
              >
                <Text
                  style={{
                    ...GlobalStyles.textBtnSecundary,
                    fontSize: 16,
                    fontFamily: 'PoppinsRegular',
                    color: colors.darkBlue,
                  }}
                >
                  Customer 1:
                </Text>
                <Text
                  style={{
                    ...GlobalStyles.textBtnSecundary,
                    fontSize: 14,
                    fontFamily: 'PoppinsRegular',
                    color: colors.darkBlue,
                  }}
                >
                  Tech Point 1. Grownet
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CustomerDayLoading
