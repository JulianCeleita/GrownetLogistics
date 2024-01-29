import { Feather, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { SearchStyles } from '../styles/ProductStyles'
import { colors } from '../styles/GlobalStyles'

function ProductSearcher({ setSearch, searchPhrase, setSearchPhrase }) {
  const handleClose = () => {
    setSearch(false)
    setSearchPhrase('')
  }
  return (
    <View style={SearchStyles.view}>
      <View style={SearchStyles.containerSearch}>
        <TextInput
          style={SearchStyles.BgInput}
          placeholder="Buscar"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        <TouchableOpacity style={SearchStyles.iconSearch}>
          <Feather name="search" size={24} color="#969696" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleClose}>
        <Ionicons
          name="ios-close-circle-outline"
          size={35}
          color={colors.darkBlue}
          style={SearchStyles.iconClose}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ProductSearcher
