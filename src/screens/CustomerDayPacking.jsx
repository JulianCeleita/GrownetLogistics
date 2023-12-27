import React from "react";
import { View, Text, TouchableOpacity, Platform, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

import { GlobalStyles, colors } from "../Styles/GlobalStyles";
import { CustomerDayStyles } from "../Styles/CustomerDayStyles";

const CustomerDayPacking = () => {
  const navigation = useNavigation()
  const isIOS = Platform.OS === "ios";
  const { width, height } = Dimensions.get('window');

  const radius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const percentage = 60;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleNavigateToProducts = () => {
    navigation.navigate('Products'); 
  };

  return (
    <LinearGradient
    colors={['#001529', '#3489d9']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: colors.bluePrimary, paddingLeft: 0 }}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 60, paddingLeft: 0 }}>
          <View
            style={{
              ...CustomerDayStyles.titleCard
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...GlobalStyles.textBtnSecundary, fontSize: 24, fontFamily: 'PoppinsSemi', color: colors.bluePrimary }}>Customer Day</Text>
            </View>
          </View>

          <View
            style={{
              ...CustomerDayStyles.searchContainer,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: "white", borderRadius: 30, padding: 8, marginRight: 10 }}>
                <Ionicons name={isIOS ? 'ios-search' : 'md-search'} size={24} color="#00478C" />
              </View>
              <Text style={{ ...GlobalStyles.textBtnSecundary, fontSize: 18, fontFamily: 'Poppins', color: colors.bluePrimary }}>Búsqueda</Text>
            </View>
          </View>

          <View style={{ width: '80%' }}>
            <TouchableOpacity
              style={{
                ...CustomerDayStyles.card,
                ...GlobalStyles.boxShadow,
              }}
              onPress={handleNavigateToProducts}
            >
              <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                <Svg
                  style={{ width: '100%' }}
                  height={radius * 2}
                  width={radius * 2}
                >
                  <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="transparent"
                    stroke="#8FDE9B"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={0}
                  />
                  <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="transparent"
                    stroke="#62C471"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                  />
                  <SvgText x={radius-6} y={radius + 6} textAnchor="middle" stroke="#00478C" fontSize="18" fontFamily="Poppins" fill="#00478C">
                    {percentage}%
                  </SvgText>
                </Svg>
              </View>
              <View style={{ width: '110%', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                <View style={{ width: '90%', alignItems: 'left', marginBottom:10 }}>
                  <Text style={{ ...GlobalStyles.textBtnSecundary, fontSize: 16, fontFamily: 'Poppins', color: colors.darkBlue }}>Customer 1:</Text>
                  <Text style={{ ...GlobalStyles.textBtnSecundary, fontSize: 14, fontFamily: 'Poppins', color: colors.darkBlue }}>Tech Point 1. Grownet</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CustomerDayPacking;
