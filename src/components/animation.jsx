import { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

// Component AnimatedSearchCard
export const AnimatedSearchCard = ({ search, children }) => {
  const translateY = useSharedValue(50)

  useEffect(() => {
    if (search) {
      translateY.value = withTiming(20, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
    } else {
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
    }
  }, [search])

  const animatedStyleCards = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  return <Animated.View style={animatedStyleCards}>{children}</Animated.View>
}

// Component AnimatedSearch
export const AnimatedSearch = ({ search, children }) => {
  const translateX = useSharedValue(300)

  useEffect(() => {
    if (search) {
      translateX.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
    } else {
      translateX.value = withTiming(300, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
    }
  }, [search])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
