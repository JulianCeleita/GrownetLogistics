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
import CustomDate from '../screens/CustomDate'
import CustomerDayLoading from '../screens/Loading/CustomerDayLoading'
import Loading from '../screens/Loading/Loading'
import ProductsLoading from '../screens/Loading/ProductsLoading'
import LoginPage from '../screens/Login/LoginPage'
import PinLogin from '../screens/Login/PinLogin'
import CustomerDayPacking from '../screens/Packing/CustomerDayPacking'
import Packing from '../screens/Packing/Packing'
import ProductsPacking from '../screens/Packing/ProductPacking'
import ProductsBulk from '../screens/ShortsBulk/ProductsBulk'
import ShortsBulk from '../screens/ShortsBulk/ShortsBulk'
import ProductsVan from '../screens/ShortsVan/ProductVan'
import ShortsVans from '../screens/ShortsVan/ShortsVans'
import useEmployeeStore from '../store/useEmployeeStore'
import useTokenStore from '../store/useTokenStore'
import { colors } from '../styles/GlobalStyles'
import ProductsPreps from '../screens/Preps/ProductsPreps'

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
function StackPreps() {
  return (
    <Stack.Navigator
      initialRouteName="ProductsPreps"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProductsPreps" component={ProductsPreps} />
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
        tabBarStyle: {
          backgroundColor: 'white',
          height: 70,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          shadowColor: '#3B3B3B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 9,
          elevation: 3,
        },
      }}
    >
      {/* TODO AGREGAR PREP Y DESCOMENTAR LAS LINEAS DE LOS ICONOS MÁS ABAJO */}
      {/* <Tab.Screen
        name="Prep"
        component={StackPreps}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <MaterialCommunityIcons name="knife" size={30} color={color} />
              <MaterialCommunityIcons
                name="knife"
                size={30}
                color={colors.lightGreen}
                style={
                  !focused
                    ? { display: 'none' }
                    : { position: 'absolute', zIndex: -1, right: 21 }
                }
              />
            </>
          ),
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontFamily: 'PoppinsRegular',
            fontSize: 10,
            marginBottom: 5,
            marginTop: -6,
          },
        }}
      /> */}
      <Tab.Screen
        name="Packing"
        component={StackPacking}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <Feather name="package" size={30} color={color} />
              <Feather
                name="package"
                size={30}
                color={colors.lightGreen}
                style={
                  !focused
                    ? { display: 'none' }
                    /* : { position: 'absolute', zIndex: -1, right: 21 } */
                    : { position: 'absolute', zIndex: -1, right: 31 }
                }
              />
            </>
          ),
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontFamily: 'PoppinsRegular',
            fontSize: 10,
            marginBottom: 5,
            marginTop: -6,
          },
        }}
      />
      <Tab.Screen
        name="Preloading"
        component={StackBulk}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <MaterialCommunityIcons
                name="package-variant"
                size={30}
                color={color}
              />
              <MaterialCommunityIcons
                name="package-variant"
                size={30}
                color={colors.lightGreen}
                style={
                  !focused
                    ? { display: 'none' }
                    /* : { position: 'absolute', zIndex: -1, right: 21 } */
                    : { position: 'absolute', zIndex: -1, right: 31 }
                }
              />
            </>
          ),
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontFamily: 'PoppinsRegular',
            fontSize: 10,
            marginBottom: 5,
            marginTop: -6,
          },
        }}
      />
      <Tab.Screen
        name="Loading"
        component={StackLoading}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={30}
                color={color}
              />
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={30}
                color={colors.lightGreen}
                style={
                  !focused
                    ? { display: 'none' }
                    /* : { position: 'absolute', zIndex: -1, right: 21 } */
                    : { position: 'absolute', zIndex: -1, right: 31 }
                }
              />
            </>
          ),
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontFamily: 'PoppinsRegular',
            fontSize: 10,
            marginBottom: 5,
            marginTop: -6,
          },
        }}
      />
      <Tab.Screen
        name="Shorts Van"
        component={StackVan}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={30}
                color={color}
              />
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={30}
                color={colors.lightGreen}
                style={
                  !focused
                    ? { display: 'none' }
                    /* : { position: 'absolute', zIndex: -1, right: 21 } */
                    : { position: 'absolute', zIndex: -1, right: 31 }
                }
              />
            </>
          ),
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontFamily: 'PoppinsRegular',
            fontSize: 10,
            marginBottom: 5,
            marginTop: -6,
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  const { token } = useTokenStore()
  const { employeeToken } = useEmployeeStore()

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
      <Stack.Navigator>
        {token && !employeeToken ? (
          <Stack.Screen
            name="PinPage"
            component={PinLogin}
            options={{ headerShown: false }}
          />
        ) : token && employeeToken ? (
          <>
            <Stack.Screen
              name="CustomDate"
              component={CustomDate}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MyTabs}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
