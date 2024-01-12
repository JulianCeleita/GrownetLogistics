import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import mainAxios from '../../axios.config'
import { datesAvailables } from '../config/urls.config'
import FechaIcon from '../img/Fecha.png'
import useEmployeeStore from '../store/useEmployeeStore'
import useTokenStore from '../store/useTokenStore'
import { CustomDateStyles } from '../styles/CustomDateStyles'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'
import { Feather } from '@expo/vector-icons'

const CustomDate = () => {
  const [animation] = useState(new Animated.Value(1))
  const [showMore, setShowMore] = useState(false)
  const [availableDates, setAvailableDates] = useState([])
  const navigation = useNavigation()
  const { setToken, idSupplier } = useTokenStore()
  const { employeeToken, setEmployeeToken } = useEmployeeStore()

  useEffect(() => {
    handleDatesAvailables()
  }, [])

  useEffect(() => {
    Animated.timing(animation, {
      toValue: showMore ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [showMore])

  const handleDatesAvailables = () => {
    const postData = {
      supplier: idSupplier,
    }
    mainAxios
      .post(datesAvailables, postData, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      })
      .then((response) => {
        const { principal, next } = response.data.operation
        const allDates = [...principal, ...next]
        setAvailableDates(allDates)
      })
      .catch((error) => {
        console.error('Error al obtener las fechas', error)
      })
  }
  const handleDatePress = () => {
    navigation.navigate('Main')
  }

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  // TODO ELIMINAR EL TOKEN PARA DESLOGUEO
  /* const deleteToken = () => {
    setToken('')
    setEmployeeToken('')
  } */

  const renderButton = (date) => {
    return (
      <View style={CustomDateStyles.whiteBackground}>
        <View style={CustomDateStyles.dateButtonContainer}>
          <TouchableOpacity
            style={CustomDateStyles.dateButton}
            onPress={handleDatePress}
          >
            <Feather name="calendar" size={45} color="white" />
          </TouchableOpacity>
        </View>
        <View style={CustomDateStyles.dateTextContainer}>
          <Text style={CustomDateStyles.buttonText}>{date}</Text>
        </View>
      </View>
    )
  }

  const renderAdditionalButtons = () => {
    if (showMore) {
      return (
        <Animated.View
          style={{
            alignItems: 'center',
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          }}
        >
          <View style={{ marginBottom: 10, marginTop: 10 }}>
            {renderButton(
              moment(availableDates[1]?.fecha).format('dddd, MMM DD'),
            )}
          </View>
        </Animated.View>
      )
    } else {
      return null
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={CustomerDayStyles.title2}>
          <Text
            style={[
              CustomDateStyles.title,
              {
                marginTop: Platform.OS === 'ios' ? null : 25,
                fontSize: Platform.OS === 'ios' ? 27 : 25,
              },
            ]}
          >
            Welcome to <Text style={CustomDateStyles.span}>Grownet</Text>
          </Text>
        </View>
        <Text style={CustomDateStyles.text}>Selecciona la fecha</Text>
        <View style={CustomDateStyles.container}>
          <ScrollView contentContainerStyle={CustomDateStyles.contentContainer}>
            <TouchableOpacity
              style={CustomDateStyles.whiteBackground}
              onPress={handleDatePress}
            >
              <View style={CustomDateStyles.dateButtonContainer}>
                <View style={CustomDateStyles.dateButton}>
                  <Feather name="calendar" size={45} color="white" />
                </View>
              </View>
              <Text style={CustomDateStyles.buttonText}>
                {moment(availableDates[0]?.fecha).format('dddd, MMM DD')}
              </Text>
            </TouchableOpacity>

            {renderAdditionalButtons()}

            <TouchableOpacity
              onPress={handleShowMore}
              style={CustomDateStyles.showMoreButton}
            >
              <Text style={CustomDateStyles.showMoreButtonText}>
                {showMore ? 'Hide' : 'Show more'}
              </Text>
            </TouchableOpacity>
            {/* TODO ELIMINAR TOKEN PARA DESLOGUEO */}
            {/* <TouchableOpacity
              style={CustomDateStyles.whiteBackground}
              onPress={deleteToken}
            >
              <Text style={CustomDateStyles.buttonText}>Delete token</Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomDate
