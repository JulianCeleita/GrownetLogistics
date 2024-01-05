import React from 'react'
import { Text, View } from 'react-native'
import ProductsCard from '../components/ProductsCard'
import { ProductStyles } from '../styles/ProductStyles'

export const ProductsList = ({ section }) => {
  console.log('section', section)
  return (
    <View key={section.reference}>
      <Text style={ProductStyles.category}>Order: {section.reference}</Text>
      {section.data.map((item) => (
        <ProductsCard key={item.id} item={item} />
      ))}
    </View>
  )
}
