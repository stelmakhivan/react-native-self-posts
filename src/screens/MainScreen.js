import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const MainScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>MainScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
