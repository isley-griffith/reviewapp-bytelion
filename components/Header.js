import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

// Header "Reviews"
export default function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>Reviews</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    marginTop: 35,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1.2,
    alignItems: 'center',
    color: 'white'
  }
})