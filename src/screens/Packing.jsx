import React from 'react'
import { View, Text, Image } from 'react-native'
import { DeliveryStyles } from '../Styles/DeliveryStyles'
import Svg, {
  Circle,
  Defs,
  ClipPath,
  Image as SvgImage,
} from 'react-native-svg'

const Packing = () => {
  const radius = 35
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (70 / 100) * circumference

  return (
    <View>
      <View style={DeliveryStyles.packing}>
        <View style={DeliveryStyles.tittle}>
          <Image
            style={DeliveryStyles.imageTittle}
            source={require('../img/loadingBlanco.png')}
            alt="Loading"
          />
          <Text style={DeliveryStyles.textTittle}>Packing</Text>
        </View>
      </View>

      <View style={DeliveryStyles.delivery}>
        <View style={DeliveryStyles.card}>
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
              href={require('../img/packing.png')}
              width={radius * 2}
              height={radius * 2}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipCard)"
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke="#4285F4"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <View>
            <Text style={DeliveryStyles.tittleRoute}>Ruta 1</Text>
            <Text>Paula Vanegas</Text>
          </View>
        </View>
        <View style={DeliveryStyles.card}>
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
              href={require('../img/packing.png')}
              width={radius * 2}
              height={radius * 2}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipCard)"
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke="#4285F4"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <View>
            <Text style={DeliveryStyles.tittleRoute}>Ruta 1</Text>
            <Text>Julian Celeita</Text>
          </View>
        </View>
        <View style={DeliveryStyles.card}>
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
              href={require('../img/packing.png')}
              width={radius * 2}
              height={radius * 2}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipCard)"
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="transparent"
              stroke="#4285F4"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <View>
            <Text style={DeliveryStyles.tittleRoute}>Ruta 1</Text>
            <Text>Heiner Arevalo</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Packing
