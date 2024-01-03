import React, { useState } from 'react'
import { View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { colors } from '../Styles/GlobalStyles'
import { ProductStyles } from '../Styles/ProductStyles'

export default function CheckBox() {
  const [isChecked, setChecked] = useState(false)

  const handleCheckboxToggle = () => {
    setChecked(!isChecked)
  }
  return (
    <View
      style={[
        ProductStyles.checkBox,
        isChecked && { backgroundColor: colors.green },
      ]}
    >
      <Checkbox.Item
        label=""
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={handleCheckboxToggle}
        color={'white'}
        uncheckedColor={'white'}
      />
    </View>
  )
}
