import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { SearchStyles } from '../styles/ProductStyles'

function ProductSearcher() {
  return (
    <View style={SearchStyles.containerSearch}>
      <TextInput
        style={SearchStyles.BgInput}
        value=""
        placeholder="Search your products"
        placeholderTextColor="#969696"
      />
      <TouchableOpacity style={SearchStyles.iconSearch}>
        <Feather name="search" size={24} color="#969696" />
      </TouchableOpacity>
    </View>
  )
}

export default ProductSearcher
