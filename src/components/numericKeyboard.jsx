import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function CalculatorKeyboard({ onNumberPress }) {
  const numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]

  return (
    <View style={styles.container}>
      {numbers.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
              style={styles.button}
            >
              <Text style={styles.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
})
