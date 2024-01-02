import React from 'react'
import ProductsCard from '../components/ProductsCard'
import { ProductStyles } from '../styles/ProductStyles'
import { FlatList } from 'react-native'

export const ProductsList = ({ section }) => {
    return (
        <FlatList
            data={section}
            keyExtractor={(item) => item.id}
            renderItem={() => {
                <View key={section.id_tittle}>
                    <Text style={ProductStyles.category}>
                        {section.id_tittle}. {section.title}
                    </Text>
                    {section.data.map((item) => (
                        <ProductsCard key={item.id} item={item} />
                    ))}
                </View>
            }}
        />
    )
}
