import {
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { colors } from '../styles/GlobalStyles'
import CustomerDayLoading from '../screens/Loading/CustomerDayLoading'
import Loading from '../screens/Loading/Loading'
import Packing from '../screens/Packing/Packing'
import ProductsCard from '../components/ProductsCard'
import ShortsBulk from '../screens/ShortsBulk/ShortsBulk'
import ShortsVan from '../screens/ShortsVan/ShortsVan'
import ProductsLoading from '../screens/Loading/ProductsLoading'
import CustomerDayPacking from '../screens/Packing/CustomerDayPacking'
import ProductsPacking from '../screens/Packing/ProductPacking'
import ProductsBulk from '../screens/ShortsBulk/ProductsBulk'
import CustomerDayBulk from '../screens/ShortsBulk/CustomerDayBulk'
import ProductsVan from '../screens/ShortsVan/ProductVan'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function StackPacking() {
  return (
    <Stack.Navigator
      initialRouteName="PackingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PackingScreen" component={Packing} />
      <Stack.Screen name="CustomerDayPacking" component={CustomerDayPacking} />
      <Stack.Screen name="ProductsPacking" component={ProductsPacking} />
    </Stack.Navigator>
  )
}
function StackLoading() {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoadingScreen" component={Loading} />
      <Stack.Screen name="CustomerDayLoading" component={CustomerDayLoading} />
      <Stack.Screen name="ProductsLoading" component={ProductsLoading} />
    </Stack.Navigator>
  )
}
function StackBulk() {
  return (
    <Stack.Navigator
      initialRouteName="ShortsBulkScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ShortsBulkScreen" component={ShortsBulk} />
      <Stack.Screen name="CustomerDayBulk" component={CustomerDayBulk} />
      <Stack.Screen name="ProductsBulk" component={ProductsBulk} />
    </Stack.Navigator>
  )
}
function StackVan() {
  return (
    <Stack.Navigator
      initialRouteName="ShortsVanScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ShortsVanScreen" component={ShortsVan} />
      <Stack.Screen name="ProductsVan" component={ProductsVan} />
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
        component={StackPacking}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="package" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Loading"
        component={StackLoading}
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
        component={StackBulk}
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
        component={StackVan}
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
