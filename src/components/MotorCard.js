import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MotorCard({ motor, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: motor.image }} style={styles.image} />
      <Text style={styles.title}>{motor.model}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", marginVertical: 10, alignItems: "center" },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
  title: { fontSize: 16 },
});
