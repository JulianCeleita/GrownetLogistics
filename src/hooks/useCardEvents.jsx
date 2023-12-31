import { useEffect, useState } from 'react'
import { usePackingStore } from '../store/usePackingStore.js'

export const useCardEvents = (quantityStore) => {
  const [pressedStates, setPressedStates] = useState({})
  const [rightStates, setRightStates] = useState({})
  const [leftStates, setLeftStates] = useState({})
  const [addQuantity, setAddQuantity] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { productsPacking, setProductsPacking, error } = usePackingStore()
  const [showModal, setShowModal] = useState(false)
  const [quantity, setQuantity] = useState(quantityStore)

  useEffect(() => {
    if (error) {
      setPressedStates({})
      setRightStates({})
      setLeftStates({})
      setAddQuantity(false)
      setSelectedProduct(null)
      setShowModal(false)
      setQuantity(0)
    }
  }, [error])

  const handlePress = (itemId) => {
    setSelectedProduct(itemId)
    const newPressedStates = Object.assign({}, pressedStates)
    const newRightStates = { ...rightStates }
    const newLeftStates = { ...leftStates }

    newPressedStates[itemId] = !newPressedStates[itemId]
    newRightStates[itemId] = false
    newLeftStates[itemId] = false

    const updatedProducts = productsPacking.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            packed: newPressedStates[itemId] ? item.quantity : '',
          }
        }
        return item
      }),
    }))
    setPressedStates(newPressedStates)
    setRightStates(newRightStates)
    setLeftStates(newLeftStates)
    setProductsPacking(updatedProducts)
    setAddQuantity(false)
  }

  const handleGestureEvent = (event, itemId) => {
    const { translationX } = event.nativeEvent
    setSelectedProduct(itemId)

    if (translationX > 0) {
      const newPressedStates = { ...pressedStates }
      const newLeftStates = { ...leftStates }

      newPressedStates[itemId] = false
      newLeftStates[itemId] = false

      setPressedStates(newPressedStates)
      setLeftStates(newLeftStates)
      setAddQuantity(true)
      setQuantity(0)

      console.log('Dezlizamos a la derecha', itemId)
    } else if (translationX < 0) {
      setShowModal(true)
      console.log('Dezlizamos a la izquierda')
    }
  }

  const declareNotAvailable = (itemId) => {
    const newLeftStates = Object.assign({}, leftStates)
    const newPressedStates = { ...pressedStates }
    const newRightStates = { ...rightStates }

    newLeftStates[itemId] = !newLeftStates[itemId]
    newPressedStates[itemId] = false
    newRightStates[itemId] = false

    const updatedProducts = productsPacking.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: newLeftStates[itemId] ? 0 : '' }
        }
        return item
      }),
    }))

    setLeftStates(newLeftStates)
    setPressedStates(newPressedStates)
    setRightStates(newRightStates)
    setProductsPacking(updatedProducts)
    setAddQuantity(false)

    console.log('Dezlizamos a la izquierda', itemId)
  }

  const declareDifferentQty = (itemId) => {
    const newRightStates = Object.assign({}, rightStates)
    newRightStates[itemId] = true

    const updatedProducts = productsPacking.map((section) => ({
      ...section,
      data: section.data.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: newRightStates[itemId] ? quantity : '' }
        }
        return item
      }),
    }))
    setRightStates(newRightStates)
    setProductsPacking(updatedProducts)
    setSelectedProduct(null)
    setAddQuantity(false)
  }

  return {
    selectedProduct,
    addQuantity,
    pressedStates,
    rightStates,
    leftStates,
    setPressedStates,
    setRightStates,
    setLeftStates,
    handlePress,
    handleGestureEvent,
    declareNotAvailable,
    declareDifferentQty,
    showModal,
    setShowModal,
    quantity,
    setQuantity,
  }
}
