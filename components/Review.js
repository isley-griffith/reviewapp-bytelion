import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Review({item}) {
    return (
        <View style={styles.container}>
            <Text>{item.id} {item.message} {item.rating}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    }
})