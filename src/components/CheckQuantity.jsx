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
  prepCard,
}) => {
  const [message, setMessage] = useState('')

  const calculateMO = () => {
    let diff = quantity - quantity_loading
    let diffString = diff % 1 === 0 ? diff : diff.toFixed(1)
    setMessage(
      quantity > quantity_loading
        ? `Missing ${diffString}`
        : quantity < quantity_loading
          ? `Overweight ${(quantity_loading - quantity) % 1 === 0 ? quantity_loading - quantity : (quantity_loading - quantity).toFixed(1)}`
          : '',
    )
  }

  useEffect(() => {
    if (packed === 0) {
      setMessage('')
    } else if (!packed) {
      if (prepCard) {
        return
      } else if (viewPacking) {
        if (quantity_loading && quantity_packing) {
          calculateMO()
        } else if (!quantity_packing && quantity_loading) {
          calculateMO()
        } else if (!quantity_loading && quantity_packing) {
          let diff = quantity - quantity_packing
          let diffString = diff % 1 === 0 ? diff : diff.toFixed(1)
          setMessage(
            quantity > quantity_packing
              ? `Missing ${diffString}`
              : quantity < quantity_packing
                ? `Overweight ${(quantity_packing - quantity) % 1 === 0 ? quantity_packing - quantity : (quantity_packing - quantity).toFixed(1)}`
                : '',
          )
        }
      } else {
        if (quantity_packing && !quantity_loading) {
          let diff = quantity - quantity_packing
          let diffString = diff % 1 === 0 ? diff : diff.toFixed(1)
          setMessage(
            quantity > quantity_packing
              ? `Missing ${diffString}`
              : quantity < quantity_packing
                ? `Overweight ${(quantity_packing - quantity) % 1 === 0 ? quantity_packing - quantity : (quantity_packing - quantity).toFixed(1)}`
                : '',
          )
        } else if (quantity_loading && quantity_packing) {
          calculateMO()
        } else if (quantity_loading && !quantity_packing) {
          calculateMO()
        }
      }
    } else {
      let diff = quantity - packed
      let diffString = diff % 1 === 0 ? diff : diff.toFixed(1)
      setMessage(
        quantity > packed
          ? `Missing ${diffString}`
          : quantity < packed
            ? `Overweight ${(packed - quantity) % 1 === 0 ? packed - quantity : (packed - quantity).toFixed(1)}`
            : '',
      )
    }

    if (
      (statePacking === 'PD' && quantity_packing && !quantity_loading) ||
      (statePacking === 'PD' && stateLoading === 'PD')
    ) {
      let diff = quantity - quantity_packing
      let diffString = diff % 1 === 0 ? diff : diff.toFixed(1)
      setMessage(
        quantity > quantity_packing
          ? `Missing ${diffString}`
          : quantity < quantity_packing
            ? `Overweight ${(quantity_packing - quantity) % 1 === 0 ? quantity_packing - quantity : (quantity_packing - quantity).toFixed(1)}`
            : '',
      )
    }
    // console.log('packed 2:', packed)
  }, [viewPacking, quantity_packing, quantity_loading, packed, prepCard])

  return (
    <Text
      style={[
        ProductStyles.textCard,
        {
          color: message.includes('Missing') ? colors.danger : colors.green,
          marginRight: message.includes('Missing') ? 50 : 30,
        },
      ]}
    >
      {message}
    </Text>
  )
}
