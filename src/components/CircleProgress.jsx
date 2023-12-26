import React from 'react'
import Svg, {
  Circle,
  Defs,
  ClipPath,
  Image as SvgImage,
} from 'react-native-svg'
import { DeliveryStyles } from '../Styles/DeliveryStyles'

function CircleProgress() {
  const radius = 40
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (60 / 100) * circumference
  return (
    <Svg style={DeliveryStyles.circle} height={radius * 2} width={radius * 2}>
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
  )
}

export default CircleProgress
