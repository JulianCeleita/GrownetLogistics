import React from 'react'
import { View, Text, TouchableOpacity, Platform, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '../Styles/GlobalStyles'

const Home = () => {
  const navigation = useNavigation()
  const isIOS = Platform.OS === 'ios'

  const menuItems = [
    {
      title: 'Packing',
      iconName: 'archive',
      onPress: () => navigation.navigate('Packing'),
    },
    {
      title: 'Loading',
      iconName: 'sync',
      onPress: () => navigation.navigate('Loading'),
    },
    {
      title: 'PrepList',
      iconName: 'list',
      onPress: () => console.log('PrepList pressed'),
    },
  ]

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          GlobalStyles.btnPrimary,
          GlobalStyles.boxShadow,
          {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginTop: index === 0 ? 0 : 10,
            justifyContent: 'space-between',
            paddingVertical: 50,
          },
        ]}
        onPress={item.onPress}
      >
        <Text style={{ ...GlobalStyles.textBtnSecundary, fontSize: 34 }}>
          {item.title}
        </Text>
        <View>
          <Ionicons
            name={isIOS ? `ios-${item.iconName}` : `md-${item.iconName}`}
            size={50}
            color="white"
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 25, paddingTop: 70 }}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default Home
