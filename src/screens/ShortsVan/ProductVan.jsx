import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { insertShort } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useShortVanStore } from '../../store/useShortVanStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import { BtnGoBack } from '../../components/BtnGoBack'
import { colors } from '../../styles/GlobalStyles'

function ProductsVan({ route }) {
  const { restaurantData, loading, error, setFetchShortVanProducts } =
    useShortVanStore()
  const { employeeToken } = useEmployeeStore()
  const { handleSubmit } = useProductSubmit(insertShort)

  useEffect(() => {
    setFetchShortVanProducts(employeeToken)
  }, [])
  return (
    <SafeAreaView style={ProductStyles.products}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={CustomerDayStyles.title2}>
          <BtnGoBack
            color={colors.darkBlue}
            top={Platform.OS === 'ios' && !Platform.isPad ? 60 : 5}
          />
          <Text style={CustomerDayStyles.customerTitle}>
            {route.params.nameRoute}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Error: {error}</Text>
          </View>
        ) : (
          <View>
            {restaurantData.map((restaurant) => (
              <View key={restaurant.vanName}>
                <Text
                  style={[
                    CustomerDayStyles.restaurantTypeTitle,
                    {
                      marginBottom: Platform.OS === 'ios' ? 5 : null,
                    },
                  ]}
                >
                  {`${restaurant.vanName} - ${restaurant.reference_orders}`}
                </Text>
                <View>
                  {restaurant.vanProducts.map((product, index) => (
                    <ProductsCardBulkVan
                      key={index}
                      item={product}
                      handleSubmit={handleSubmit}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsVan
