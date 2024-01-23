import React from 'react'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import { DeliveryStyles } from '../styles/DeliveryStyles'
import { colors } from '../styles/GlobalStyles'

function CircleProgress({ percentage }) {
  const radius = 40
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  console.log(percentage)
  let roundedPercentage = Math.round(percentage)
  return (
    <Svg style={DeliveryStyles.circle} height={radius * 2} width={radius * 2}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={
          roundedPercentage <= 49
            ? '#FFB7B7'
            : roundedPercentage <= 99
              ? '#FFCA8C'
              : roundedPercentage == 100
                ? colors.green
                : '#FFB7B7'
        }
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={0}
      />
      <Circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={
          roundedPercentage <= 49
            ? colors.danger
            : roundedPercentage <= 99
              ? colors.orange
              : roundedPercentage == 100
                ? colors.green
                : colors.danger
        }
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
      />
      <SvgText
        x={radius - 0}
        y={radius + 6}
        textAnchor="middle"
        stroke="#00478C"
        fontSize="18"
        fill={colors.darkBlue}
      >
        {roundedPercentage + '%'}
      </SvgText>
    </Svg>
  )
}

export default CircleProgress
