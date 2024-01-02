import React from 'react'
import { Text, View } from 'react-native'
import ProductsCard from '../components/ProductsCard'
import { ProductStyles } from '../styles/ProductStyles'

export const ProductsList = ({ section }) => {

    return (

        <View key={section.id_tittle}>
            <Text style={ProductStyles.category}>
                {section.id_tittle}. {section.title}
            </Text>
            {section.data.map((item) => (
                <ProductsCard key={item.id} item={item} />
            ))}
        </View>

    )
}
