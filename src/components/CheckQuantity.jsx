import React, { useState, useEffect } from 'react'
import { ProductStyles } from '../styles/ProductStyles'
import { Text } from 'react-native'
import { colors } from '../styles/GlobalStyles'

export const CheckQuantity = ({
  viewPacking,
  quantity,
  quantity_packing,
  quantity_loading,
  packed,

  stateLoading,
  statePacking,
}) => {
  const [message, setMessage] = useState('')

  //console.log({ quantity, quantity_packing, quantity_loading })


  useEffect(() => {
    if (!packed) {
      if (viewPacking) {
        // Vista de packing
        if (quantity_loading && quantity_packing) {
          setMessage(
            quantity > quantity_loading
              ? `Missing ${quantity - quantity_loading}`
              : quantity < quantity_loading
                ? `Overweight ${quantity_loading - quantity}`
                : '',
          )
        } else if (!quantity_packing && quantity_loading) {
          setMessage(
            quantity > quantity_loading
              ? `Missing ${quantity - quantity_loading}`
              : quantity < quantity_loading
                ? `Overweight ${quantity_loading - quantity}`
                : '',
          )
        } else if (!quantity_loading && quantity_packing) {
          setMessage(
            quantity > quantity_packing
              ? `Missing ${quantity - quantity_packing}`
              : quantity < quantity_packing
                ? `Overweight ${quantity_packing - quantity}`
                : '',
          )
        }
      } else {
        // Vista de loading
        if (quantity_packing && !quantity_loading) {
          setMessage(
            quantity > quantity_packing
              ? `Missing ${quantity - quantity_packing}`
              : quantity < quantity_packing
                ? `Overweight ${quantity_packing - quantity}`
                : '',
          )
        } else if (quantity_loading && quantity_packing) {
          setMessage(
            quantity > quantity_loading
              ? `Missing ${quantity - quantity_loading}`
              : quantity < quantity_loading
                ? `Overweight ${quantity_loading - quantity}`
                : '',
          )
        }
      }
    } else {
      setMessage(
        quantity > packed
          ? `Missing ${quantity - packed}`
          : quantity < packed
            ? `Overweight ${packed - quantity}`
            : '',
      )
    }

    if (
      (statePacking === 'PD' && quantity_packing && !quantity_loading) ||
      (statePacking === 'PD' && stateLoading === 'PD')
    ) {
      setMessage(
        quantity > quantity_packing
          ? `Missing ${quantity - quantity_packing}`
          : quantity < quantity_packing
            ? `Overweight ${quantity_packing - quantity}`
            : '',
      )
    }

  }, [viewPacking, quantity_packing, quantity_loading, packed])

  return (
    <Text
      style={[
        ProductStyles.textCard,
        {
          color: message.includes('Missing') ? colors.danger : colors.green,
          marginRight: 50,
        },
      ]}
    >
      {message}
    </Text>
  )
}
