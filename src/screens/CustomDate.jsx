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
import useOrdersByDate from '../store/useOrdersByDateStore'
import useTokenStore from '../store/useTokenStore'
import { CustomDateStyles } from '../styles/CustomDateStyles'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'

const CustomDate = () => {
  const [animation] = useState(new Animated.Value(1))
  const [showMore, setShowMore] = useState(false)
  const [availableDates, setAvailableDates] = useState([] || '')
  const navigation = useNavigation()
  const { idSupplier } = useTokenStore()
  const { employeeToken } = useEmployeeStore()
  const { setRoutesByDate } = useOrdersByDate()
  const [numberOfDates, setNumberOfDates] = useState(1)

  useEffect(() => {
    handleDatesAvailables()
  }, [])

  console.log({ idSupplier });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: showMore ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [showMore])

  const handleDatesAvailables = () => {
    const postData = {
      days: 2,
      supplier: idSupplier,
    }
    mainAxios
      .post(datesAvailables, postData, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(datesAvailables, postData);
        const { principal, next } = response.data.operation
        const allDates = [...principal, ...next] || []
        setAvailableDates(allDates)
      })
      .catch((error) => {
        console.error('Error al obtener las fechas', error)
      })
  }
  const handleDatePress = (date) => {
    if (date) {
      setRoutesByDate(employeeToken, date)
      navigation.navigate('Main')
    }
  }

  const handleShowMore = () => {
    setShowMore(true)
    if (showMore) {
      const newNumberOfDates = Math.min(numberOfDates + 1)
      setNumberOfDates(newNumberOfDates)
    }
    if (numberOfDates === availableDates.length - 1) {
      setNumberOfDates(1)
      setShowMore(!showMore)
    }
  }

  // TODO ELIMINAR EL TOKEN PARA DESLOGUEO
  const deleteToken = () => {
    setToken('')
    setEmployeeToken('')
  }

  const renderButton = (date) => {
    const formattedDate = moment(date, 'dddd, MMM DD').format('YYYY-MM-DD')
    return (
      <View style={CustomDateStyles.whiteBackground}>
        <View style={CustomDateStyles.dateButtonContainer}>
          <TouchableOpacity
            style={CustomDateStyles.dateButton}
            onPress={() => handleDatePress(formattedDate)}
          >
            <Image source={FechaIcon} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>
        <View style={CustomDateStyles.dateTextContainer}>
          <Text style={CustomDateStyles.buttonText}>{date}</Text>
        </View>
      </View>
    )
  }

  const renderAdditionalButtons = () => {
    if (showMore && availableDates.length > 0) {
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
          {availableDates.slice(1, numberOfDates + 1).map((date, index) => (
            <View key={index} style={{ marginBottom: 10, marginTop: 10 }}>
              {renderButton(moment(date.fecha).format('dddd, MMM DD'))}
            </View>
          ))}
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
              CustomerDayStyles.customerTitle,
              {
                marginTop: Platform.OS === 'ios' ? null : 25,
                fontSize: Platform.OS === 'ios' ? 27 : 25,
              },
            ]}
          >
            Date
          </Text>
        </View>
        <View style={CustomDateStyles.container}>
          <ScrollView contentContainerStyle={CustomDateStyles.contentContainer}>
            {!availableDates.length ? (
              <Text style={CustomDateStyles.noDatesText}>
                No workable dates available
              </Text>
            ) : (
              <>
                <TouchableOpacity
                  style={CustomDateStyles.whiteBackground}
                  onPress={() => handleDatePress(availableDates[0]?.fecha)}
                >
                  <View style={CustomDateStyles.dateButtonContainer}>
                    <View style={CustomDateStyles.dateButton}>
                      <Image
                        source={FechaIcon}
                        style={{ width: 50, height: 50 }}
                      />
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
                    {showMore && numberOfDates === availableDates.length - 1
                      ? 'Hide'
                      : 'Show more'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
          {/* TODO ELIMINAR TOKEN PARA DESLOGUEO */}
          <TouchableOpacity
            style={CustomDateStyles.whiteBackground}
            onPress={deleteToken}
          >
            <Text style={CustomDateStyles.buttonText}>Delete token</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomDate
