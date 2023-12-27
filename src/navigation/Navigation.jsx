import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Loading from '../screens/Loading'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home'
import { colors } from '../Styles/GlobalStyles'
import Packing from '../screens/Packing'
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_300Light_Italic,
} from '@expo-google-fonts/poppins'
import ShortsBulk from '../screens/ShortsBulk'
import ShortsVan from '../screens/ShortsVan'
import Products from '../screens/Products'
import CustomerDay from '../screens/CustomerDay'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function MyStacks() {
  return (
    <Stack.Navigator
      initialRouteName="PackingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PackingScreen" component={Packing} />
      <Stack.Screen name="LoadingScreen" component={Loading} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ShortsVanScreen" component={ShortsVan} />
      <Stack.Screen name="ShortsBulkScreen" component={ShortsBulk} />
      <Stack.Screen name="CustomerDayScreen" component={CustomerDay} />
    </Stack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Packing"
      screenOptions={{
        tabBarActiveTintColor: colors.darkBlue,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Packing"
        component={MyStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="package" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Loading"
        component={Loading}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shorts Bulk"
        component={ShortsBulk}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="package-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shorts Van"
        component={ShortsVan}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  const [fontsLoaded] = useFonts({
    PoppinsBold: Poppins_700Bold,
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemi: Poppins_600SemiBold,
    PoppinsItalic: Poppins_300Light_Italic,
  })
  useEffect(() => {}, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  )
}
