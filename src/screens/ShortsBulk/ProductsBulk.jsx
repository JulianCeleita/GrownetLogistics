import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnGoBack } from '../../components/BtnGoBack'
import { ProductsCardBulkVan } from '../../components/ProductsCardBulkVan'
import { insertShort } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useShortBulkStore } from '../../store/useShortBulkStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import useOrdersByDate from '../../store/useOrdersByDateStore'

function ProductsBulk({ route }) {
  const { typeData, loading, error, setFetchShortBulkProducts } =
    useShortBulkStore()
  const { employeeToken } = useEmployeeStore()
  const { selectedDate, selectedRoute } = useOrdersByDate()
  const { handleSubmit } = useProductSubmit(insertShort)

  useEffect(() => {
    const dataBulk = {
      routeName: selectedRoute,
      date: selectedDate,
    }
    setFetchShortBulkProducts(employeeToken, dataBulk)
  }, [])

  return (
    <SafeAreaView style={ProductStyles.products}>
      <BtnGoBack
        color={colors.darkBlue}
        top={Platform.OS === 'ios' && !Platform.isPad ? 65 : 5}
      />
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={CustomerDayStyles.title2}>

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
            {typeData.map((type, index) => (
              <View key={index}>
                <View style={{ marginBottom: 0 }}>
                  <Text
                    style={[
                      CustomerDayStyles.restaurantTypeTitle,
                      {
                        marginBottom: Platform.OS === 'ios' ? 5 : null,
                      },
                    ]}
                  >
                    {type.bulkType}
                  </Text>
                </View>
                <View>
                  {type.bulkProducts.map((product) => (
                    <ProductsCardBulkVan
                      key={product.id}
                      item={product}
                      handleSubmit={handleSubmit}
                      viewBulk
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

export default ProductsBulk
