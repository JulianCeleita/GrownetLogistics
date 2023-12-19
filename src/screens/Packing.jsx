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

const Packing = () => {
  const radius = 40
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (60 / 100) * circumference

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
              width={45}
              height={30}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipCard)"
              x={18}
              y={25}
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
              width={45}
              height={30}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipCard)"
              x={18}
              y={25}
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
              width={45}
              height={30}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipCard)"
              x={18}
              y={25}
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
        </View>
      </View>
    </View>
  )
}

export default Packing
