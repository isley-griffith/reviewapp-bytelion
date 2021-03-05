import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../styles/global.js";
import { MaterialIcons } from '@expo/vector-icons'

export default function Review({ item }) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View>
            {/* Message and created_at */}
          <View>
            <Text style={styles.reviewText}>{item.message}</Text>
          </View>
          <View>
            <Text style={{ opacity: 0.4 }}>{item.created_at}</Text>
          </View>
          <View style={{flexDirection:'row', paddingTop: 10}}>
              <MaterialIcons name="thumb-up" color='coral' size={16}/>
              <Text style={{fontSize: 16}}> 0 </Text>
              <MaterialIcons name="thumb-down" color='teal' size={16}/>
          </View>
        </View>
        {/** rating */}
        <View>
          <Text style={styles.reviewText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  reviewText: {
    flex: 1,
    fontFamily: "RobotoRegular",
    fontSize: 18,
  },
});
