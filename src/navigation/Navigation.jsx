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
import CustomDate from '../screens/CustomDate'
import CustomerDayLoading from '../screens/Loading/CustomerDayLoading'
import Loading from '../screens/Loading/Loading'
import ProductsLoading from '../screens/Loading/ProductsLoading'
import ConfirmationLogin from '../screens/Login/ConfirmationLogin'
import LoginPage from '../screens/Login/LoginPage'
import CustomerDayPacking from '../screens/Packing/CustomerDayPacking'
import Packing from '../screens/Packing/Packing'
import ProductsPacking from '../screens/Packing/ProductPacking'
import ProductsBulk from '../screens/ShortsBulk/ProductsBulk'
import ShortsBulk from '../screens/ShortsBulk/ShortsBulk'
import CustomerDayVan from '../screens/ShortsVan/CustomerDayVan'
import ProductsVan from '../screens/ShortsVan/ProductVan'
import ShortsVans from '../screens/ShortsVan/ShortsVans'
import useTokenStore from '../store/useTokenStore'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function StackLogin() {
  return (
    <Stack.Navigator
      initialRouteName="LoginPage"
      headerMode="none"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="ConfirmationPage" component={ConfirmationLogin} />
      <Stack.Screen name="PackingScreen" component={StackPacking} />
    </Stack.Navigator>
  )
}

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
      <Stack.Screen name="ProductsBulk" component={ProductsBulk} />
    </Stack.Navigator>
  )
}

function StackVan() {
  return (
    <Stack.Navigator
      initialRouteName="ShortsVans"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ShortsVans" component={ShortsVans} />
      <Stack.Screen name="CustomerDayVan" component={CustomerDayVan} />
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
  const { token } = useTokenStore()
  console.log(token)

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
      <Stack.Navigator initialRouteName="CustomDate">
        {/* TODO DEJAR ESTA LOGICA PARA EL MENU INFERIOR */}
        {/* {token ? <MyTabs /> : <StackLogin />} */}
        <Stack.Screen
          name="CustomDate"
          component={CustomDate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
