import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Animated, SafeAreaView } from 'react-native';
import FechaIcon from '../img/Fecha.png';
import { CustomDateStyles } from '../styles/CustomDateStyles';
import { CustomerDayStyles } from '../styles/CustomerDayStyles';

const CustomDate = () => {
  const [animation] = useState(new Animated.Value(1));
  const [currentDate, setCurrentDate] = useState(moment().format('MMM DD'));
  const [currentDay, setCurrentDay] = useState(moment().format('dddd'));
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment().format('MMM DD'));
      setCurrentDay(moment().format('dddd'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: showMore ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showMore]);

  const handleDatePress = () => {
    console.log('Button pressed: Date');
    navigation.navigate('PackingScreen');
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const renderButton = (date) => {
    return (
      <View style={CustomDateStyles.whiteBackground}>
        <View style={CustomDateStyles.dateButtonContainer}>
          <TouchableOpacity
            style={CustomDateStyles.dateButton}
            onPress={handleDatePress}
          >
            <Image source={FechaIcon} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>
        <View style={CustomDateStyles.dateTextContainer}>
          <Text style={CustomDateStyles.buttonText}>{date}</Text>
        </View>
      </View>
    );
  };

  const renderAdditionalButtons = () => {
    if (showMore) {
      const initialDate = moment().add(1, 'days');
      const dates = [];

      for (let i = 0; i < 2; i++) {
        const nextDate = initialDate
          .clone()
          .add(i, 'days')
          .format('ddd, MMM DD');
        dates.push(nextDate);
      }

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
          {dates.map((date, index) => (
            <View
              key={index}
              style={{ marginBottom: 10, marginTop: index === 0 ? 10 : 0 }}
            >
              {renderButton(date)}
            </View>
          ))}
        </Animated.View>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={CustomerDayStyles.title2}>
          <Text style={[CustomerDayStyles.customerTitle, { marginTop: Platform.OS === 'ios' ? null : 25, fontSize: Platform.OS === 'ios' ? 27 : 25 }]}>Date</Text>
        </View>

        <View style={CustomDateStyles.container}>
          <ScrollView contentContainerStyle={CustomDateStyles.contentContainer}>
            <TouchableOpacity
              style={CustomDateStyles.whiteBackground}
              onPress={handleDatePress}
            >
              <View style={CustomDateStyles.dateButtonContainer}>
                <View style={CustomDateStyles.dateButton}>
                  <Image source={FechaIcon} style={{ width: 50, height: 50 }} />
                </View>
              </View>
              <View style={CustomDateStyles.dateTextContainer}>
                <Text style={CustomDateStyles.buttonText}>
                  {currentDay}, {currentDate}
                </Text>
              </View>
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
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomDate;
