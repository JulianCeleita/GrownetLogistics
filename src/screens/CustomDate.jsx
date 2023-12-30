import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { CustomDateStyles } from '../../styles/CustomDateStyles';
import FechaIcon from '../../img/Fecha.png';
import moment from 'moment';

const CustomDate = () => {
  const [currentDate, setCurrentDate] = useState(moment().format('MMM DD'));
  const [currentDay, setCurrentDay] = useState(moment().format('dddd'));
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment().format('MMM DD'));
      setCurrentDay(moment().format('dddd'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDatePress = () => {
    console.log('Button pressed: Date');
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const renderButton = (date) => {
    return (
      <View style={CustomDateStyles.whiteBackground}>
        <View style={CustomDateStyles.dateButtonContainer}>
          <TouchableOpacity style={CustomDateStyles.dateButton} onPress={handleDatePress}>
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
  
      for (let i = 0; i < 2; i++) { // Modificación aquí: cambiar el límite a 2 iteraciones
        const nextDate = initialDate.clone().add(i, 'days').format('ddd, MMM DD');
        dates.push(nextDate);
      }
  
      return (
        <View style={{ alignItems: 'center' }}>
          {dates.map((date, index) => (
            <View key={index} style={{ marginBottom: 10, marginTop: index === 0 ? 10 : 0 }}>
              {renderButton(date)}
            </View>
          ))}
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <View style={CustomDateStyles.container}>
      <ScrollView contentContainerStyle={CustomDateStyles.contentContainer}>
        <View style={CustomDateStyles.whiteBackground}>
          <View style={CustomDateStyles.dateButtonContainer}>
            <TouchableOpacity style={CustomDateStyles.dateButton} onPress={handleDatePress}>
              <Image source={FechaIcon} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>
          <View style={CustomDateStyles.dateTextContainer}>
            <Text style={CustomDateStyles.buttonText}>{currentDay}, {currentDate}</Text>
          </View>
        </View>

        {renderAdditionalButtons()}

        <TouchableOpacity onPress={handleShowMore} style={CustomDateStyles.showMoreButton}>
          <Text>Show more</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CustomDate;
