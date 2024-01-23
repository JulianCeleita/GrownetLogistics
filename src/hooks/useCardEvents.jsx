import { useEffect, useState } from 'react'

export const useCardEvents = (quantityStore, products, setProducts, error) => {
  const [pressedStates, setPressedStates] = useState({})
  const [rightStates, setRightStates] = useState({})
  const [leftStates, setLeftStates] = useState({})
  const [addQuantity, setAddQuantity] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
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

  const handlePress = (itemIds) => {
    if (!Array.isArray(itemIds)) {
      itemIds = [itemIds]
    }
    itemIds.forEach((itemId) => {
      setSelectedProduct(itemId)
      const newPressedStates = Object.assign({}, pressedStates)
      const newRightStates = { ...rightStates }
      const newLeftStates = { ...leftStates }

      newPressedStates[itemId] = !newPressedStates[itemId]
      newRightStates[itemId] = false
      newLeftStates[itemId] = false

      const updatedProducts = {
        ...products,
        data: products.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              packed: newPressedStates[itemId] ? item.quantity : '',
            }
          }
          return item
        }),
      }

      setPressedStates(newPressedStates)
      setRightStates(newRightStates)
      setLeftStates(newLeftStates)
      setProducts(updatedProducts)
      setAddQuantity(false)
    })
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
      setQuantity(quantityStore)
    } else if (translationX < 0) {
      setShowModal(true)
    }
  }

  const declareNotAvailable = (itemId) => {
    const newLeftStates = Object.assign({}, leftStates)
    const newPressedStates = { ...pressedStates }
    const newRightStates = { ...rightStates }

    newLeftStates[itemId] = !newLeftStates[itemId]
    newPressedStates[itemId] = false
    newRightStates[itemId] = false

    const updatedProducts = {
      ...products,
      data: products.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: newLeftStates[itemId] ? 0 : '' }
        }
        return item
      }),
    }

    setLeftStates(newLeftStates)
    setPressedStates(newPressedStates)
    setRightStates(newRightStates)
    setProducts(updatedProducts)
    setAddQuantity(false)
  }

  const declareDifferentQty = (itemId) => {
    const newRightStates = Object.assign({}, rightStates)
    newRightStates[itemId] = true

    const updatedProducts = {
      ...products,
      data: products.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: newRightStates[itemId] ? quantity : '' }
        }
        return item
      }),
    }
    setRightStates(newRightStates)
    setProducts(updatedProducts)
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
    setAddQuantity,
    setSelectedProduct
  }
}
